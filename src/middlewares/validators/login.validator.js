const { body } = require('express-validator');

module.exports = () => {
  return [
    body('email').isEmail().withMessage('Email invalido!'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Contraseña requerida!'),
  ];
};
