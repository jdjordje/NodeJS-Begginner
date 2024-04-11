import { Order } from "../models/order.models.js";

export class OrderService{
    
    static async getAllOrders(){
        const orders = await Order.find({});
        return orders;
    }


    static async createOrder(orderData){
        const newOrder = new Order(orderData);
        const createdOrder = await newOrder.save();
    }
}