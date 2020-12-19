const fs = require('fs');
const path = require('path');

module.exports.deleteFile = function (filename) {
  const dir = path.join(
    __dirname,
    `../public/uploads/images/${filename}`
  );
  fs.stat(dir, function (err) {
    if (!err) {
      return fs.unlinkSync(dir);
    }
    return;
  });
};
