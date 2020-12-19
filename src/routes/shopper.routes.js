const { Router } = require('express');
const { AuthMiddleware, UploadImageMiddleware } = require('../middlewares');

module.exports = function ({ ShopperController }) {
  const router = Router();
  router.get('/:id', [AuthMiddleware], ShopperController.getUserIncludeShopper);
  router.post(
    '/:id',
    [AuthMiddleware, UploadImageMiddleware.single('imgProfile')],
    ShopperController.saveOrUpdateShopper
  );

  return router;
};
