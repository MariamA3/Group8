import mongoose from 'mongoose';


const ResponseSchema = new mongoose.Schema({
  study: { type: mongoose.Schema.Types.ObjectId, ref: 'Study', required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  questionText: String,
  feedbackType: String,
  answer: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Response", ResponseSchema);
