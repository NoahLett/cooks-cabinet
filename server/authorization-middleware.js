const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new ClientError(401, 'authentication required');
  }
  const token = authHeader.replace('Bearer ', '');
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
