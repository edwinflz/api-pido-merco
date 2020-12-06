const BaseRepository = require('./base.repository');
let _offer = null;
let _db = null;
class OfferRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Offer');
    _offer = db.Offer;
    _db = db;
  }

  getOffersToShopper(id) {
    return _offer.scope('actives').findAll({
      attributes: ['id', 'dateIn', 'total', 'status'],
      include: [
        {
          model: _db.Business,
          as: 'business',
          attributes: ['nameBusiness', 'address', 'photo'],
        },
        {
          model: _db.Order,
          as: 'order',
          attributes: ['id', 'shopperId', 'status'],
          where: { shopperId: id },
        },
      ],
    });
  }
}

module.exports = OfferRepository;
