module.exports = {
  NotFoundMiddleware: require('./not-found.middleware'),
  ErrorMiddleware: require('./error.middleware'),
  AuthMiddleware: require('./auth.middleware'),
  AuthPublicMiddleware: require('./auth-public.middleware'),
  CacheMiddleware: require('./cache.middleware'),
  ValidatorMiddleware: require('./validator.middleware'),
  UploadImageMiddleware: require('./upload-avatar.middleware'),
};
