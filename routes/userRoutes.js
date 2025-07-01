const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.role === "owner") {
      const users = await User.find({});
      res.json(users);
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error Fetching Users" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = { username };

    if (password) {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
