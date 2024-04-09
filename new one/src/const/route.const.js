import { Router } from "express";
import { productRouter } from "../routes/products.routes.js";

export const globalRouter = Router();

globalRouter.use("/products", productRouter);
