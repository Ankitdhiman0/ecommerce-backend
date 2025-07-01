const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["consumer", "admin", "owner"],
    default: "consumer",
  },
});

module.exports = mongoose.model("User", userSchema);
