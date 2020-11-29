const BaseRepository = require('./base.repository');
let _orderDetail = null;
class OrderDetailRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'OrderDetail');
    _orderDetail = db.OrderDetail;
  }
}

module.exports = OrderDetailRepository;
