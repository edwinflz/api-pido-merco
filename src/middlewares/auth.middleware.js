const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { CONSTANTS } = require('../helpers');
const { generateError } = require('../helpers/generate-error.helper');
module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    generateError(CONSTANTS.STATUS_401, CONSTANTS.ERROR_AUTH_PUBLIC_KEY);
  }

  jwt.verify(token, SECRET_KEY, function (error, decodedToken) {
    if (error) {
      generateError(CONSTANTS.STATUS_419, CONSTANTS.ERROR_AUTH_TOKEN);
    }
    req.user = decodedToken.user;
    next();
  });
};
