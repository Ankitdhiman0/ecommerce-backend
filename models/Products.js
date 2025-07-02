const mongoose = require("mongoose");
require("dotenv").config();

const productsSchema = new mongoose.Schema({
  title: String,
  category: String,
  subcategory: String,
  price: Number,
  image: [String], // image url
  description: String,
});

module.exports = mongoose.model("Product", productsSchema);
