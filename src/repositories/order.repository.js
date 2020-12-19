const BaseRepository = require('./base.repository');

class OrderRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Order');
    this.db = db;
  }

  getOrdersToShopper(id) {
    return this.db.Order.scope('actives').findAll({
      attributes: ['id', 'dateIn', 'dateOut', 'status'],
      where: { shopperId: id },
      include: [
        {
          model: this.db.OrderDetail,
          as: 'details',
          attributes: ['id', 'product', 'brand', 'quantity', 'measure'],
        },
        {
          model: this.db.Subcategory,
          as: 'subcategory',
          attributes: ['id', 'nameSubCategory', 'img'],
        },
      ],
    });
  }
}

module.exports = OrderRepository;
