const { Router } = require('express');
const { AuthMiddleware, CacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');
module.exports = function ({ MunicipalityController }) {
  const router = Router();
  router.get('/', [AuthMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], MunicipalityController.index);

  return router;
};
