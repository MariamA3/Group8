
const ArtefactSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchProject", required: true },
    //adding researcher id so we can filter the data later based on researcher
    researcher: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher", required: true }, 
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Artefact", ArtefactSchema);
