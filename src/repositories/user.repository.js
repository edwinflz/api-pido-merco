const BaseRepository = require('./base.repository');
let _user = null;
let _db = null;
class UserRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'User');
    _user = db.User;
    _db = db;
  }

  getUserByEmail(email) {
    return _user.findOne({ where: { email } });
  }

  getUserIncludeShopper(id) {
    return _user.findOne({
      attributes: ['id', 'name'],
      include: {
        model: _db.Shopper,
        as: 'shopper',
        attributes: [
          'id',
          'municipalityId',
          'domicile',
          'domicileTwo',
          'domicileThree',
          'imgProfile',
        ],
        include: {
          model: _db.Municipality,
          as: 'municipality',
          attributes: ['id', 'nameMunicipality'],
        },
      },
      where: { id },
    });
  }
}

module.exports = UserRepository;
