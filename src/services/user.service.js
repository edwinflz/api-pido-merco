const BaseService = require('./base.service');
class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.userRepository = UserRepository;
  }

  async getUser(id) {
    return await this.userRepository.getUser(id);
  }

  async getUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async getUserIncludeShopper(id) {
    return await this.userRepository.getUserIncludeShopper(id);
  }
}

module.exports = UserService;
