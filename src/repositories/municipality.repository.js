const BaseRepository = require('./base.repository');
let _municipality = null;

class MunicipalityRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Municipality');
    _municipality = db.Municipality;
  }

  getAllMunicipalities() {
    return _municipality.findAll({
      attributes: ['id', 'nameMunicipality'],
      where: { status: 1 },
    });
  }
}

module.exports = MunicipalityRepository;
