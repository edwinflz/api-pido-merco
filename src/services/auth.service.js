const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { generateToken } = require('../helpers/jwt.helper');
let _userService = null;
class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async register(user) {
    const { email } = user;
    const hasUser = await _userService.getUserByEmail(email);

    if (hasUser) {
      const error = new Error();
      error.status = 422;
      error.message = 'Este email ya está en uso!';
      throw error;
    }

    const createUser = await _userService.create(user);

    const userEncode = {
      id: createUser.id,
      name: createUser.name,
    };

    const token = generateToken(userEncode);

    return { token, user: userEncode };
  }

  async login(user) {
    const { email, password } = user;

    const hasUser = await _userService.getUserByEmail(email);

    if (!hasUser || !compareSync(password, hasUser.password)) {
      const error = new Error();
      error.status = 422;
      error.message = 'Usuario y/o contraseña incorrecta!';
      throw error;
    }

    const userEncode = {
      id: hasUser.id,
      name: hasUser.name,
    };

    const token = generateToken(userEncode);

    return { token, user: userEncode };
  }

  async changePassword(user) {
    const { email, password } = user;
    const salt = genSaltSync();
    user.password = hashSync(password, salt);
    //return await _userService.update(user, 2);
  }
}

module.exports = AuthService;
