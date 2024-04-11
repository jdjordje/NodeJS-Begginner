import { Router } from "express";
import { productRouter } from "../routes/products.routes.js";
import { orderRouter } from "../routes/orders.routes.js";

export const globalRouter = Router();

globalRouter.use("/products", productRouter);
globalRouter.use("/orders", orderRouter);