const mongoose = require("mongoose");
const Products = require("./Products");

const orderSchema = mongoose.Schema({
  userId: { required: true, type: String },
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
