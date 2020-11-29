const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
module.exports = function ({ CategoryRoutes, AuthRoutes }) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use('/categories', CategoryRoutes);
  apiRoutes.use('/auth', AuthRoutes);
  router.use('/api', apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
 

  return router;
};
