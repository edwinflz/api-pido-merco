const { body } = require('express-validator');

module.exports = () => {
  return [
    body('subcategoryId').not().isEmpty().withMessage('Subcategoria requerida!'),
  ];
};
