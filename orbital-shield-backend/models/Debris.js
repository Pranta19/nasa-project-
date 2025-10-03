const mongoose = require("mongoose");

const debrisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: "unknown" },
  velocity: { type: Number, default: 0 }, // km/s
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Debris", debrisSchema);
