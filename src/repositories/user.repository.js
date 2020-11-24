const BaseRepository = require('./base.repository');
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'User');
    _user = db.User;
  }

  getUserByEmail(email) {
    return _user.findOne({ where: { email } });
  }
}

module.exports = UserRepository;
