require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const app = express();
app.use(staticMiddleware);
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const result = await db.query(
      'INSERT INTO users (firstName, lastName, username, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING userId, username', [firstName, lastName, username, hashedPassword]
    );
    const token = jwt.sign({ id: result.rows[0].userId }, process.env.TOKEN_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/api/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1', [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValidPassword = await argon2.verify(result.rows[0].password, password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: result.rows[0].userId }, process.env.TOKEN_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
