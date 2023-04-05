const jwt = require('jsonwebtoken');
const BadAuthError = require('./BadAuthErr');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new BadAuthError('Пользователь не авторизован'));
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? process.env.JWT_SECRET : 'secret');
  } catch (e) {
    next(new BadAuthError('Пользователь не авторизован'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = { auth };
