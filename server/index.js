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

app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const result = await db.query(
      'INSERT INTO users (firstName, lastName, username, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING userId', [firstName, lastName, username, hashedPassword]
    );
    const token = jwt.sign({ id: result.rows[0].id }, process.env.TOKEN_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
