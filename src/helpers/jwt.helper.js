const { sign } = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports.generateToken = function (user) {
  return sign(user, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 15 });
};
