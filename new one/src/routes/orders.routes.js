import { Router } from "express";
import { OrderController } from "../controllers/orders.controller.js";

export const orderRouter = Router();

orderRouter.get("/", OrderController.getAllOrders)
orderRouter.post("/", OrderController.createOrder)