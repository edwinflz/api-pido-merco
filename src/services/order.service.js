const BaseService = require('./base.service');
const { addHour } = require('../helpers/add-hour-date');
let _orderRepository = null;
let _orderDetailRepository = null;
let _userService = null;
let _db = null;
class OrderService extends BaseService {
  constructor({ db, OrderRepository, OrderDetailRepository, UserService }) {
    super(OrderRepository);
    _db = db;
    _orderRepository = OrderRepository;
    _orderDetailRepository = OrderDetailRepository;
    _userService = UserService;
  }

  async save(request) {

    const { userId, details } = request;
    const hasUser = await _userService.get(userId);
    this.validateOrder(hasUser, details);
    const order = await this.buildOrder(request, hasUser);

    const t = await _db.sequelize.transaction();

    try {
      const createOrder = await _orderRepository.create(order, {
        transaction: t,
      });

      details.forEach(
        async (detail) =>
          await _orderDetailRepository.create(
            { ...detail, orderId: createOrder.id, status: 1 },
            { transaction: t }
          )
      );
      await t.commit();
      return {
        msg: 'Su cotización se ha procesado procesado con exito!',
      };
    } catch (error) {
      await t.rollback();
      throw new Error('No se pudo procesar su cotización');
    }
  }

  validateOrder(hasUser, details) {
    if (!hasUser) {
      const error = new Error();
      error.status = 419;
      error.message = 'Auth Invalido!';
      throw error;
    }

    if (details.length === 0) {
      const error = new Error();
      error.status = 422;
      error.message = 'Se requiere detalle de la cotización!';
      throw error;
    }
  }

  async buildOrder(request, hasUser) {
    const shopper = await hasUser.getShopper();
    const date = new Date();

    return {
      shopperId: shopper.id,
      subcategoryId: request.subcategoryId,
      dateIn: date,
      dateOut: addHour(date),
      comment: request.comment,
      bussinessId: request.bussinessId,
      cash: request.payment === 'Efectivo' ? 1 : 0,
      dataphone: request.payment === 'Tarjeta (Datafono)' ? 1 : 0,
      status: 1,
    };
  }
}

module.exports = OrderService;
