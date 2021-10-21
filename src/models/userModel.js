const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: "User Name is required", unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
