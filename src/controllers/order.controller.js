let orderService = null;
class OrderController {
  constructor({ OrderService }) {
    orderService = OrderService;
  }

  async save(req, res) {
    const { body } = req;
    const order = await orderService.save(body);
    return res.status(201).send(order);
  }

  async getOrdersToShopper(req, res) {
    const { id } = req.params;
    const orders = await orderService.getOrdersToShopper(id);
    return res.status(200).send(orders);
  }
}

module.exports = OrderController;
