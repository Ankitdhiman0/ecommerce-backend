const express = require("express");
const Products = require("../models/Products");
const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    const query = category ? { category: category.toLowerCase() } : {};
    const products = await Products.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Products Did'nt found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
