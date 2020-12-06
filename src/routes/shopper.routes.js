const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function ({ ShopperController }) {
  const router = Router();
  router.post('/', [AuthMiddleware], ShopperController.save);
 
  return router;
};
