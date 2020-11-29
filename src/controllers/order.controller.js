let _orderService = null;
class OrderController {
  constructor({ OrderService }) {
    _orderService = OrderService;
  }

  async save(req, res) {
    const { body } = req;
    const order = await _orderService.save(body);
    return res.status(201).send(order);
  }
}

module.exports = OrderController;
