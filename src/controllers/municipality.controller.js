let municipalityService = null;
class MunicipalityController {
  constructor({ MunicipalityService }) {
    municipalityService = MunicipalityService;
  }

  async index(req, res) {
    const municipalities = await municipalityService.getAllMunicipalities();
    return res.send(municipalities);
  }
}

module.exports = MunicipalityController;
