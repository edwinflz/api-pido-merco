const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
module.exports = function ({
  CategoryRoutes,
  AuthRoutes,
  OrderRoutes,
  OfferRoutes,
  ShopperRoutes,
  MunicipalityRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use('/categories', CategoryRoutes);
  apiRoutes.use('/auth', AuthRoutes);
  apiRoutes.use('/orders', OrderRoutes);
  apiRoutes.use('/offers', OfferRoutes);
  apiRoutes.use('/shoppers', ShopperRoutes);
  apiRoutes.use('/municipalities', MunicipalityRoutes);
  router.use('/api', apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
