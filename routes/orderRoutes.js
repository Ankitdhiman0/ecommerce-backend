const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const orderController = require("../controller/orderController");
const router = express.Router();

// Create Orders
router.post("/", authMiddleware, orderController.CreateOrder);

// Get All Orders
router.get("/", authMiddleware, orderController.getAllOrders);

// Get user Orders
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

// Delete Orders
router.delete("/:id", authMiddleware, orderController.deleteOrder);

// Update Status
router.put("/:id/status", authMiddleware, orderController.updateOrderStatus);

module.exports = router;
