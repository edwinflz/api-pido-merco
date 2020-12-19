class MunicipalityService {
  constructor({ MunicipalityRepository }) {
    this.municipalityRepository = MunicipalityRepository;
  }

  async getAllMunicipalities() {
    return await this.municipalityRepository.getAllMunicipalities();
  }
}

module.exports = MunicipalityService;
