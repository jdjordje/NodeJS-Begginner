import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  date: {
    type: Date,
    
  }
    ,
  user: {
    type: String,
    required: [true, `Please inser user name!`],
  },
  poducts: [
    {
      type: Schema.Types.ObjectId,

      ref: "Product",
    },
  ],
});

export const Order = model("Order", orderSchema)