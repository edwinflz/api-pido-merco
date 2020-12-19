const { API_KEY } = require('../config');
const { CONSTANTS } = require('../helpers');
const { generateError } = require('../helpers/generate-error.helper');
module.exports = function (req, res, next) {
  const appPublicKey = req.header('x_aplication_id');

  if (!appPublicKey || appPublicKey !== API_KEY) {
    generateError(CONSTANTS.STATUS_401, CONSTANTS.ERROR_AUTH_PUBLIC_KEY);
  }
  next();
};
