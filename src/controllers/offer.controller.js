let _offerService = null;
class OfferController {
  constructor({ OfferService }) {
    _offerService = OfferService;
  }

  async getOffersToShopper(req, res) {
    const { id } = req.params;
    const offers = await _offerService.getOffersToShopper(id);
    return res.status(200).send(offers);
  }
}

module.exports = OfferController;
