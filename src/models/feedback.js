const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    artefact: { type: mongoose.Schema.Types.ObjectId, ref: "Artefact", required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    submittedAt: { type: Date, default: Date.now },
  });
  
  const Feedback = mongoose.model("Feedback", FeedbackSchema);
  module.exports = Feedback
  