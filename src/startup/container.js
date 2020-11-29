const { createContainer, asClass, asValue, asFunction } = require('awilix');

// config
const config = require('../config');
const app = require('.');

// db
const db = require('../database/models');

// services
const {
  CategoryService,
  UserService,
  AuthService,
  OrderService,
} = require('../services');

// repositories
const {
  CategoryRepository,
  UserRepository,
  OrderRepository,
  OrderDetailRepository,
} = require('../repositories');

// controllers
const {
  CategoryController,
  AuthController,
  OrderController,
} = require('../controllers');

// routes
const Routes = require('../routes');
const {
  CategoryRoutes,
  AuthRoutes,
  OrderRoutes,
} = require('../routes/index.routes');

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
    OrderController: asClass(OrderController.bind(OrderController)).singleton(),
  })
  .register({
    CategoryService: asClass(CategoryService).singleton(),
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    OrderService: asClass(OrderService).singleton(),
  })
  .register({
    CategoryRepository: asClass(CategoryRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
    OrderRepository: asClass(OrderRepository).singleton(),
    OrderDetailRepository: asClass(OrderDetailRepository).singleton(),
  })
  .register({
    CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    OrderRoutes: asFunction(OrderRoutes).singleton(),
  });

module.exports = container;
