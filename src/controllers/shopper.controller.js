let _shopperService = null;
class ShopperController {
  constructor({ ShopperService }) {
    _shopperService = ShopperService;
  }

  async getUserIncludeShopper(req, res) {
    const { id } = req.params;
    const user = await _shopperService.getUserIncludeShopper(id);
    return res.status(200).send(user);
  }

  async save(req, res) {
    const { body } = req;
    const shopper = await _shopperService.save(body);
    return res.status(201).send(shopper);
  }

}

module.exports = ShopperController;
