const BaseService = require('./base.service');

let _shopperRepository = null;
let _userService = null;
let _db = null;
class ShopperService extends BaseService {
  constructor({ db, ShopperRepository, UserService }) {
    super(ShopperRepository);
    _db = db;
    _shopperRepository = ShopperRepository;
    _userService = UserService;
  }

  async save(request) {
    const { userId } = request;
    const hasUser = await _userService.get(userId);

    if (!hasUser) {
      const error = new Error();
      error.status = 419;
      error.message = 'Auth Invalido!';
      throw error;
    }

  }

  
  
}

module.exports = ShopperService;
