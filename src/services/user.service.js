const BaseService = require('./base.service');
let _userRepository = null;
class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    _userRepository = UserRepository;
  }

  async getUserByEmail(email) {
    return await _userRepository.getUserByEmail(email);
  }

  async getUserIncludeShopper(id) {
    return await _userRepository.getUserIncludeShopper(id);
  }
}

module.exports = UserService;
