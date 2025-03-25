const mongoose = require('mongoose');
 
const studySchema = new mongoose.Schema({
    researcher: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher", required: true },
    title: { type: String, required: true },
    description: { type: String },
    //three modes here so we have better control of what is posted
    status: { type: String, enum: ["draft", "active", "completed"], default: "draft" },
    tartDate: { type: Date },  
    endDate: { type: Date }, 
    createdAt: { type: Date, default: Date.now },   
});
const Study = mongoose.model('Study', studySchema);
module.exports = Study;