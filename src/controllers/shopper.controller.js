let shopperService = null;
class ShopperController {
  constructor({ ShopperService }) {
    shopperService = ShopperService;
  }

  async getUserIncludeShopperWithBusiness(req, res) {
    const { id } = req.params;
    const user = await shopperService.getUserIncludeShopperWithBusiness(id);
    return res.status(200).send(user);
  }

  async saveOrUpdateShopper(req, res) {
    const { body, file, params } = req;
    const shopper = await shopperService.saveOrUpdate(body, file, params);
    return res.status(200).send(shopper);
  }
}

module.exports = ShopperController;
