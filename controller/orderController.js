const Order = require("../models/OrderModel");

exports.CreateOrder = async (req, res) => {
  try {
    const { products } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      products,
      status: "pending", // default status
    });

    await newOrder.save();
    res.status(201).json({ msg: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("products");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ msg: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
