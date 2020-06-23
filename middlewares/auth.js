const jwt = require('jsonwebtoken');
const NonAuth = require('../errors/NonAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new NonAuth('Необходима авторизация');
};

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    handleAuthError(res);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
