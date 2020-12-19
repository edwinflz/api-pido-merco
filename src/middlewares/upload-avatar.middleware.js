const multer = require('multer');
const { CONSTANTS } = require('../helpers');
const { generateError } = require('../helpers/generate-error.helper');
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    generateError(CONSTANTS.STATUS_422, 'Por favor solo subir imagenes.');
    cb(error, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-merco-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
