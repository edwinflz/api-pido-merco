const addHours = require('date-fns/addHours');

module.exports.addHour = function (date) {
  return addHours(date, 1);
};
