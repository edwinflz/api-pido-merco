let _municipalityService = null;

class MunicipalityController {
  constructor({ MunicipalityService }) {
    _municipalityService = MunicipalityService;
  }

  async index(req, res) {
    const municipalities = await _municipalityService.getAllMunicipalities();
    return res.send(municipalities);
  }
}

module.exports = MunicipalityController;
