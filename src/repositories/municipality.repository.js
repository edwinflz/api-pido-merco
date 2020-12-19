class MunicipalityRepository {
  constructor({ db }) {
    this.db = db;
  }

  getAllMunicipalities() {
    return this.db.Municipality.findAll({
      attributes: ['id', 'nameMunicipality'],
      where: { status: 1 },
    });
  }
}

module.exports = MunicipalityRepository;
