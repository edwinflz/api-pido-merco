const BaseRepository = require('./base.repository');
class OrderDetailRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'OrderDetail');
  }
}

module.exports = OrderDetailRepository;
