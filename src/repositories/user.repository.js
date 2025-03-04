const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'User');
    this.db = db;
  }

  getUserByEmail(email) {
    return this.db.User.findOne({ where: { email } });
  }

  getUser(id) {
    return this.db.User.findOne({ attributes: ['id', 'name'], where: { id } });
  }

  getUserIncludeShopperWithBusiness(id) {
    return this.db.User.findOne({
      attributes: ['id', 'name'],
      include: [
        {
          model: this.db.Shopper,
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
            model: this.db.Municipality,
            as: 'municipality',
            attributes: ['id', 'nameMunicipality'],
          },
        },
        {
          model: this.db.Business,
          as: 'business',
          attributes: [
            'id',
            'nit',
            'municipalityId',
            'nameBusiness',
            'address',
            'phone',
            'photo',
            'status'
          ],
        },
      ],
      where: { id },
    });
  }
}

module.exports = UserRepository;
