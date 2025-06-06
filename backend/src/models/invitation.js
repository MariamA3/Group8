import mongoose from 'mongoose';


//unsure if we need this, but adding so we can use if needed. 

const InvitationSchema = new mongoose.Schema({
    study: { type: mongoose.Schema.Types.ObjectId, ref: "Study", required: true },
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
    sentAt: { type: Date, default: Date.now },
  });


export default mongoose.model("Invitation", InvitationSchema);

  