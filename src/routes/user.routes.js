const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');
module.exports = function ({ UserController }) {
  const router = Router();
  router.get('/image/:id', UserController.getImage);
  router.get('/:id', [AuthMiddleware], UserController.getUser);
  return router;
};
