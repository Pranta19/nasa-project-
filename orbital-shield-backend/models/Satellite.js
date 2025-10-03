const mongoose = require("mongoose");

const satelliteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orbit: { type: String, required: true },
  status: { type: String, default: "active" },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Satellite", satelliteSchema);
