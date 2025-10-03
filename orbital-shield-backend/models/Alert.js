const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  satellite: { type: String, required: true },
  debris: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  risk: { type: String, enum: ["MONITOR", "CRITICAL"], default: "MONITOR" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);
