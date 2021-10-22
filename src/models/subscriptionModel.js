const mongoose = require("mongoose");

const { systemConfig } = require("../configs");
const { validator } = require("../utils");

const subscriptionSchema = new mongoose.Schema(
  {
    userName: { type: String, required: "User Name is required" },
    planId: { type: String, required: "Plan Id is required", enum: systemConfig.planIdEnumArray },
    startDate: { 
        type: Date, 
        required: "Start Date is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema, "subscriptions");
