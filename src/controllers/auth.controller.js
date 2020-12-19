let authService = null;
class AuthController {
  constructor({ AuthService }) {
    authService = AuthService;
  }

  async register(req, res) {
    const { body } = req;
    const user = await authService.register(body);
    return res.status(201).send(user);
  }

  async login(req, res) {
    const { body } = req;
    const user = await authService.login(body);
    return res.send(user);
  }

  async changePassword(req, res) {
    const { body } = req;
    const user = await authService.changePassword(body);
    return res.send(user);
  }
}

module.exports = AuthController;
