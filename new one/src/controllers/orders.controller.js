import { OrderService } from "../services/order.services.js";

export class OrderController {
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();

      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async createOrder(req, res) {
    try {
        const createOrder = await OrderService.createOrder(req.body);

        return res.status(201).json(createOrder)
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}
