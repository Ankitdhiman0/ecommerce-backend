const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Order = require("../models/OrderModel");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalAmount,
    });

    const saved = newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log("Order Error", err);
    res.status(500).json({ message: "Order Creating Failed " });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.role === "owner") {
      const orders = await Order.find();
      res.json(orders);
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
