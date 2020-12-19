const BaseRepository = require('./base.repository');
class ShopperRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Shopper');
  }
}

module.exports = ShopperRepository;
