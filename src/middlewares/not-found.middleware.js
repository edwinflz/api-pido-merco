const { CONSTANTS } = require('../helpers');
module.exports = (req, res, next) =>
  res
    .status(404)
    .send({ status: CONSTANTS.STATUS_404, message: CONSTANTS.ERROR_NOT_FOUND });
