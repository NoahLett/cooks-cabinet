require('dotenv/config');
const path = require('path');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyJWT = require('./verify-jwt');

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
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'Both a username and password are required');
  }
  const check = `
    SELECT * FROM "users" WHERE username = $1
    `;
  const checkParams = [username];
  db.query(check, checkParams)
    .then(result => {
      if (result.rows[0]) {
        throw new ClientError(409, 'Username taken');
      }
      bcrypt
        .hash(password, 10)
        .then(hashedPassword => {
          const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
        `;
          const params = [username, hashedPassword];
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
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
          "username",
          "hashedPassword"
    from "users"
    where "username" = $1
    `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, username, hashedPassword } = user;
      bcrypt
        .compare(password, hashedPassword)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// Protected Routes //

app.use(verifyJWT);

app.post('/api/new-recipe', (req, res, next) => {
  const { userId } = req.user;
  const { name, description, photoUrl, steps, ingredients } = req.body;
  if (!name || !description || !photoUrl || !steps || !ingredients) {
    throw new ClientError(401, 'Please ensure all fields are properly filled');
  }
  const sql = `
    INSERT INTO recipes ("name", "description", "photoUrl", "steps", "ingredients", "userId")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const params = [name, description, photoUrl, steps, ingredients, userId];
  db.query(sql, params)
    .then(result => {
      const [recipe] = result.rows;
      res.status(201).json(recipe);
    })
    .catch(err => next(err));
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
