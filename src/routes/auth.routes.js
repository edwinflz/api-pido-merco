const { Router } = require('express');
const {
  ValidatorMiddleware,
  AuthPublicMiddleware,
} = require('../middlewares');
const {
  LoginValidator,
  RegisterValidator,
} = require('../middlewares/validators');

module.exports = function ({ AuthController }) {
  const router = Router();
  router.post(
    '/login',
    LoginValidator(),
    [ValidatorMiddleware, AuthPublicMiddleware],
    AuthController.login
  );
  router.post(
    '/register',
    RegisterValidator(),
    [ValidatorMiddleware, AuthPublicMiddleware],
    AuthController.register
  );
  // router.patch('/changePassword', AuthController.changePassword);

  return router;
};
