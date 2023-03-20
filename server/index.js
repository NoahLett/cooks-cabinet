require('dotenv/config');
const path = require('path');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');

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
  argon2
    .hash(pwd)
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
