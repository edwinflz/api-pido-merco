const BaseService = require('./base.service');

let _offerRepository = null;
let _userService = null;
let _db = null;
class OfferService extends BaseService {
  constructor({ db, OfferRepository, UserService }) {
    super(OfferRepository);
    _db = db;
    _offerRepository = OfferRepository;
    _userService = UserService;
  }

 

  async getOffersToShopper(id) {
    const hasUser = await _userService.get(id);
    const shopper = await hasUser.getShopper();

    if (!hasUser && !shopper) {
      const error = new Error();
      error.status = 419;
      error.message = 'Auth Invalido!';
      throw error;
    }

    const offers = await _offerRepository.getOffersToShopper(shopper.id);
    
    return offers;
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

}

module.exports = OfferService;
