const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = 'No tienes permisos para acceder al recurso';
    throw error;
  }

  jwt.verify(token, SECRET_KEY, function (error, decodedToken) {
    if (error) {
      const error = new Error();
      error.status = 419;
      error.message = 'Token invalido';
      throw error;
    }
    req.user = decodedToken.user;
    next();
  });
};
