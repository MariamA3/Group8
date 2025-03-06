const mongoose = require("mongoose");

const ResearcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["researcher"], default: "researcher" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Researcher", ResearcherSchema);