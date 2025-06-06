import mongoose from 'mongoose';
import { questionSchema } from './question.js';


const studySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  researcher: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher" },
  status: String,
  startDate: String,
  endDate: String,
  questions: [questionSchema], 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Study", studySchema);
