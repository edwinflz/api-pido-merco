const BaseService = require('./base.service');
const { CONSTANTS } = require('../helpers');
const { addHour } = require('../helpers/add-hour-date.helper');
const { generateError } = require('../helpers/generate-error.helper');

class OrderService extends BaseService {
  constructor({
    db,
    OrderRepository,
    OrderDetailRepository,
    UserService,
    CategoryService,
  }) {
    super(OrderRepository);
    this.db = db;
    this.orderRepository = OrderRepository;
    this.orderDetailRepository = OrderDetailRepository;
    this.userService = UserService;
    this.categoryService = CategoryService;
  }

  async save(request) {
    const { userId, details, subcategoryId } = request;
    const hasUser = await this.userService.get(userId);
    const subcategory = await this.categoryService.getSubcategoryBySlug(
      subcategoryId
    );
    this.validateOrder(hasUser, details, subcategory);

    const order = await this.buildOrder(request, hasUser, subcategory);
    let transaction;
    let createOrder;
    try {
      transaction = await this.db.sequelize.transaction();

      createOrder = await this.orderRepository.create(
        { ...order },
        { transaction }
      );

      for (const detail of details) {
        delete detail.id;
        await this.orderDetailRepository.create(
          { ...detail, orderId: createOrder.id, status: 1 },
          { transaction }
        );
      }

      await transaction.commit();

      return {
        status: 200,
        msg: 'Su cotización se ha procesado procesado con exito!',
      };
    } catch (error) {
      await transaction.rollback();
      if (createOrder) {
        createOrder.destroy();
      }
      generateError(CONSTANTS.STATUS_404, CONSTANTS.ERROR_ORDER_SAVE);
    }
  }

  async getOrdersToShopper(id) {
    const hasUser = await this.userService.getUserIncludeShopper(id);

    let orderActive = [];
    let orderWithOffers = [];

    if (!hasUser) {
      generateError(CONSTANTS.STATUS_419, CONSTANTS.ERROR_AUTH_TOKEN);
    }

    if (!hasUser.shopper) {
      return {
        ordersActive: orderActive,
        ordersWithOffers: orderWithOffers,
      };
    }

    const orders = await this.orderRepository.getOrdersToShopper(
      hasUser.shopper.id
    );
    const date = new Date();
    orders.forEach(async (order) => {
      switch (order.status) {
        case 1:
          const push = await this.checkDateOut(date, order);
          if (push) {
            orderActive.push(order);
          }
          break;
        case 2:
          orderWithOffers.push(order);
          break;
      }
    });

    return {
      ordersActive: orderActive,
      ordersWithOffers: orderWithOffers,
    };
  }

  async checkDateOut(date, order) {
    const dateOrder = new Date(order.dateOut);
    if (date.getTime() > dateOrder.getTime()) {
      await this.orderRepository.update(order.id, { status: 0 });
      return false;
    }
    return true;
  }

  validateOrder(hasUser, details, subcategory) {
    if (!hasUser) {
      generateError(CONSTANTS.STATUS_419, CONSTANTS.ERROR_AUTH_TOKEN);
    }
    if (details.length === 0) {
      generateError(
        CONSTANTS.STATUS_422,
        'Se requiere detalle de la cotización!'
      );
    }
    if (!subcategory) {
      generateError(CONSTANTS.STATUS_422, CONSTANTS.ERROR_NOT_VALIDATE);
    }
  }

  async buildOrder(request, hasUser, subcategory) {
    const shopper = await hasUser.getShopper();
    const date = new Date();

    return {
      shopperId: shopper.id,
      subcategoryId: subcategory.id,
      dateIn: date,
      dateOut: addHour(date),
      comment: request.comment,
      bussinessId: 0,
      cash: request.payment === 'Efectivo' ? 1 : 0,
      dataphone: request.payment === 'Tarjeta (Datafono)' ? 1 : 0,
      status: 1,
    };
  }
}

module.exports = OrderService;
