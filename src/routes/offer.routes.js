const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function ({ OfferController }) {
  const router = Router();
  router.get('/:id', [AuthMiddleware], OfferController.getOffersToShopper);

  return router;
};
