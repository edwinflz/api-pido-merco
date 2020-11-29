const BaseRepository = require('./base.repository');
let _order = null;
class OrderRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Order');
    _order = db.Order;
  }
}

module.exports = OrderRepository;
