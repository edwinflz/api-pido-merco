let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async register(req, res) {
    const { body } = req;
    const user = await _authService.register(body);
    return res.status(201).send(user);
  }

  async login(req, res) {
    const { body } = req;
    const user = await _authService.login(body);
    return res.send(user);
  }
  
  async changePassword(req, res) {
    const { body } = req;
    const user = await _authService.changePassword(body);
    return res.send(user);
  }
}

module.exports = AuthController;
