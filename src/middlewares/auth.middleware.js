const jwt = require('jsonwebtoken');
const { SECRET_KEY, API_KEY } = require('../config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  const appPublicKey = req.header('x_aplication_id');
 
  if (!token && !appPublicKey) {
    const error = new Error();
    error.status = 401;
    error.message = 'No tienes permisos para acceder al recurso';
    throw error;
  }

  if (appPublicKey === API_KEY) {
    next();
  } else {
    jwt.verify(token, SECRET_KEY, function (error, decodedToken) {
      if (error) {
        const error = new Error();
        error.status = 419;
        error.message = 'Auth invalido';
        throw error;
      }
      req.user = decodedToken.user;
      next();
    });
  }
};
