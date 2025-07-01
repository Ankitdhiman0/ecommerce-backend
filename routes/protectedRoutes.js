const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/protectedRoute", authMiddleware, (req, res) => {
  res.status(200).json({
    message: `this is protected route and my role is ${req.user.role} and my id is ${req.user.id}`,
  });
});

module.exports = router;
