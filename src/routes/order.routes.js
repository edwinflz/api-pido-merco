const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function ({ OrderController }) {
  const router = Router();
  router.post('/', [AuthMiddleware], OrderController.save);
  router.get('/:id', [AuthMiddleware], OrderController.getOrdersToShopper);

  return router;
};
