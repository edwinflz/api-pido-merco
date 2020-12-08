const BaseService = require('./base.service');
let _municipalityRepository = null;
class MunicipalityService extends BaseService {
  constructor({ MunicipalityRepository }) {
    super(MunicipalityRepository);
    _municipalityRepository = MunicipalityRepository;
  }

  async getAllMunicipalities() {
    return await _municipalityRepository.getAllMunicipalities();
  }
}

module.exports = MunicipalityService;
