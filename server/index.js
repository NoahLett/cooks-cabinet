require('dotenv/config');
const path = require('path');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const check = `
    SELECT * FROM "users" WHERE username = $1
    `;
  const checkParams = [user];
  db.query(check, checkParams)
    .then(result => {
      if (result.rows[0]) {
        return res.sendStatus(409);
      }
      bcrypt
        .hash(pwd, 10)
        .then(hashedPassword => {
          const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
        `;
          const params = [user, hashedPassword];
          db.query(sql, params)
            .then(result => {
              const newUser = result.rows[0];
              res.status(201).json(newUser);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
          "username",
          "hashedPassword"
    from "users"
    where "username" = $1
    `;
  const params = [user];
  db.query(sql, params)
    .then(result => {
      const [foundUser] = result.rows;
      if (!foundUser) {
        throw new ClientError(401, 'invalid login');
      }
      const { username, hashedPassword } = foundUser;
      bcrypt
        .compare(pwd, hashedPassword)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const accessToken = jwt.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
          );
          const refreshToken = jwt.sign(
            { username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
          res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
          res.json({ accessToken });
        });
    });
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: `cannot ${req.method} ${req.url}` });
});

app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
