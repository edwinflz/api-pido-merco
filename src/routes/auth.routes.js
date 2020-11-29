const { Router } = require('express');
const { ValidatorMiddleware } = require('../middlewares');
const {
  LoginValidator,
  RegisterValidator,
} = require('../middlewares/validators');

module.exports = function ({ AuthController }) {
  const router = Router();
  router.post(
    '/login',
    LoginValidator(),
    ValidatorMiddleware,
    AuthController.login
  );
  router.post(
    '/register',
    RegisterValidator(),
    ValidatorMiddleware,
    AuthController.register
  );
  // router.patch('/changePassword', AuthController.changePassword);

  return router;
};
