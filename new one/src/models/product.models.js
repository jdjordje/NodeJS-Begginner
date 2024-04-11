import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, `Please insert product Title!`],
  },
  stock: {
    type: Number,
    min: 0,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

productSchema.index({
  description: "text",
});

export const Product = model("Product", productSchema);
