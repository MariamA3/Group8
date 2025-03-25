const mongoose = require('mongoose')

const ArtefactSchema = new mongoose.Schema({
    study: { type: mongoose.Schema.Types.ObjectId, ref: "Study", required: true },
    //adding researcher id so we can filter the data later based on researcher
    researcher: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher", required: true }, 
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { 
        type: String, 
        required: true,
        match: /\.(jpg|jpeg|png|gif|mp4|mov|avi|mp3|wav|ogg)$/i, // Restricts allowed file types
    },
    createdAt: { type: Date, default: Date.now },
});

const Artefact =  mongoose.model("Artefact", ArtefactSchema);
module.exports = Artefact;
