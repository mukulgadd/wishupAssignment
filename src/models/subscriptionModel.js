const mongoose = require("mongoose");

const { systemConfig } = require("../configs");
const { validator } = require("../utils");

const subscriptionSchema = new mongoose.Schema(
  {
    userName: { type: String, required: "User Name is required", unique: true, refs: "User" },
    planId: { type: String, required: "Plan Id is required", enum: systemConfig.planIdEnumArray },
    startDate: { 
        type: Date, 
        required: "Start Date is required",
        validate: {
            validator: validator.validateDate,
            message: "Please fill a valid date in YYYY-MM-DD format",
          }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema, "subscriptions");
