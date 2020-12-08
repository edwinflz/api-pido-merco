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
  OfferService,
  ShopperService,
  MunicipalityService
} = require('../services');

// repositories
const {
  CategoryRepository,
  UserRepository,
  OrderRepository,
  OrderDetailRepository,
  OfferRepository,
  ShopperRepository,
  MunicipalityRepository
} = require('../repositories');

// controllers
const {
  CategoryController,
  AuthController,
  OrderController,
  OfferController,
  ShopperController,
  MunicipalityController
} = require('../controllers');

// routes
const Routes = require('../routes');
const {
  CategoryRoutes,
  AuthRoutes,
  OrderRoutes,
  OfferRoutes,
  ShopperRoutes,
  MunicipalityRoutes
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
    OfferController: asClass(OfferController.bind(OfferController)).singleton(),
    ShopperController: asClass(ShopperController.bind(ShopperController)).singleton(),
    MunicipalityController: asClass(MunicipalityController.bind(MunicipalityController)).singleton(),
  })
  .register({
    CategoryService: asClass(CategoryService).singleton(),
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    OrderService: asClass(OrderService).singleton(),
    OfferService: asClass(OfferService).singleton(),
    ShopperService: asClass(ShopperService).singleton(),
    MunicipalityService: asClass(MunicipalityService).singleton(),
  })
  .register({
    CategoryRepository: asClass(CategoryRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
    OrderRepository: asClass(OrderRepository).singleton(),
    OrderDetailRepository: asClass(OrderDetailRepository).singleton(),
    OfferRepository: asClass(OfferRepository).singleton(),
    ShopperRepository: asClass(ShopperRepository).singleton(),
    MunicipalityRepository: asClass(MunicipalityRepository).singleton(),
  })
  .register({
    CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    OrderRoutes: asFunction(OrderRoutes).singleton(),
    OfferRoutes: asFunction(OfferRoutes).singleton(),
    ShopperRoutes: asFunction(ShopperRoutes).singleton(),
    MunicipalityRoutes: asFunction(MunicipalityRoutes).singleton(),
  });

module.exports = container;
