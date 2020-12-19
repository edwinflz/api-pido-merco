const path = require('path');
const fs = require('fs');
let userService = null;
class UserController {
  constructor({ UserService }) {
    userService = UserService;
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await userService.getUser(id);
    return res.send(user);
  }

  async getImage(req, res) {
    const { id } = req.params;
    const dir = path.join(__dirname, `../public/uploads/images/${id}`);
    fs.stat(dir, function (err) {
      if (!err) {
        return res.sendFile(path.resolve(dir));
      }
      return res.status(404);
    });
  }
}

module.exports = UserController;
