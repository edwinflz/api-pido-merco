let _shopperService = null;
class ShopperController {
  constructor({ ShopperService }) {
    _shopperService = ShopperService;
  }

  async save(req, res) {
    const { body } = req;
    const shopper = await _shopperService.save(body);
    return res.status(201).send(shopper);
  }

}

module.exports = ShopperController;
