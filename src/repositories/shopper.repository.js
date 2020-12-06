const BaseRepository = require('./base.repository');
let _shopper = null;
let _db = null;
class ShopperRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Shopper');
    _shopper = db.Shopper;
    _db = db;
  }

}

module.exports = ShopperRepository;
