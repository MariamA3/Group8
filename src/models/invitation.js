
//unsure if we need this, but adding so we can use if needed. 

const InvitationSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchProject", required: true },
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
    sentAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Invitation", InvitationSchema);
  