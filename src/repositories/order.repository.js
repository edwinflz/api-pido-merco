const BaseRepository = require('./base.repository');
let _order = null;
let _db = null;
class OrderRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Order');
    _order = db.Order;
    _db = db;
  }

  getOrdersToShopper(id) {
    return _order.scope('actives').findAll({
      attributes: ['id', 'dateIn', 'dateOut', 'status'],
      where: { shopperId: id },
      include: [
        {
          model: _db.OrderDetail,
          as: 'details',
          attributes: ['id', 'product', 'brand', 'quantity', 'measure'],
        },
        {
          model: _db.Subcategory,
          as: 'subcategory',
          attributes: ['id', 'nameSubCategory', 'img'],
        },
      ],
    });
  }
}

module.exports = OrderRepository;
