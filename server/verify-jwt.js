const jwt = require('jsonwebtoken');
require('dotenv').config();
const ClientError = require('./client-error');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return new ClientError(401, 'Access Denied');
  // eslint-disable-next-line no-console
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return new ClientError(403, 'invalid token');
      req.user = decoded.username;
      next();
    }
  );
};

module.exports = verifyJWT;
