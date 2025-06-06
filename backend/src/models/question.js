
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  feedbackType: String,
  artefacts: [
    {
      url: String,
      file: {
        name: String,
      },
    },
  ],
});

export { questionSchema };

export default mongoose.model("Question", questionSchema);
