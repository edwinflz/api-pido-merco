const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { generateToken } = require('../helpers/jwt.helper');
const { generateError } = require('../helpers/generate-error.helper');
const { CONSTANTS } = require('../helpers');
class AuthService {
  constructor({ UserService }) {
    this.userService = UserService;
  }

  async register(user) {
    const { email } = user;
    const hasUser = await this.userService.getUserByEmail(email);

    if (hasUser) this.reportError(CONSTANTS.REGISTER);
    const createUser = await this.userService.create({ ...user, status: 1 });
    const userEncode = this.buildUserEncode(createUser);
    const token = generateToken(userEncode);

    return {
      token,
      user: userEncode,
      status: 200,
      msg: `Bienvenido ${createUser.name}`,
    };
  }

  async login(user) {
    const { email, password } = user;

    const hasUser = await this.userService.getUserByEmail(email);
    if (!hasUser || !compareSync(password, hasUser.password))
      this.reportError(CONSTANTS.LOGIN);

    const userEncode = this.buildUserEncode(hasUser);
    const token = generateToken(userEncode);

    return {
      token,
      user: userEncode,
      status: 200,
      msg: `Bienvenido ${hasUser.name}`,
    };
  }

  async changePassword(user) {
    const { email, password } = user;
    const salt = genSaltSync();
    user.password = hashSync(password, salt);
    //return await _userService.update(user, 2);
  }

  reportError(option) {
    switch (option) {
      case CONSTANTS.REGISTER:
        generateError(CONSTANTS.STATUS_422, 'Este email ya está en uso!');
        break;
      case CONSTANTS.LOGIN:
        generateError(
          CONSTANTS.STATUS_422,
          'Usuario y/o contraseña incorrecta!'
        );
      default:
        break;
    }
    throw error;
  }

  buildUserEncode(user) {
    return {
      id: user.id,
      name: user.name,
    };
  }
}

module.exports = AuthService;
