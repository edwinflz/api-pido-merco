const { createContainer, asClass, asValue, asFunction } = require('awilix');

// config
const config = require('../config');
const app = require('.');

// db
const db = require('../database/models');

// services
const { CategoryService, UserService, AuthService } = require('../services');

// repositories
const { CategoryRepository, UserRepository } = require('../repositories');

// controllers
const { CategoryController, AuthController } = require('../controllers');

// routes
const Routes = require('../routes');
const { CategoryRoutes, AuthRoutes } = require('../routes/index.routes');

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    db: asValue(db),
  })
  .register({
    CategoryController: asClass(
      CategoryController.bind(CategoryController)
    ).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
  })
  .register({
    CategoryService: asClass(CategoryService).singleton(),
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    CategoryRepository: asClass(CategoryRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
  })
  .register({
    CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  });

module.exports = container;
