const mongoose = require("mongoose");
const dbConnection = require("./dbConnection");
const Researcher = require("./models/researcher");
const Study = require("./models/study");
const Artefact = require("./models/artefact");

async function populateDB() {
    try {
        await dbConnection();
        await mongoose.connection.db.dropDatabase();
        
        const researchers = await Researcher.insertMany([
            { name: "Alice Johnson", email: "alice@example.com", passwordHash: "hashedpassword123" },
            { name: "Bob Smith", email: "bob@example.com", passwordHash: "hashedpassword456" },
            { name: "Charlie Davis", email: "charlie@example.com", passwordHash: "hashedpassword789" }
        ]);
        
        const studies = await Study.insertMany([
            { researcher: researchers[0]._id, title: "AI and Human Behavior", description: "A study on AI's impact on decision-making.", status: "active", startDate: new Date("2025-04-01"), endDate: new Date("2025-09-30") },
            { researcher: researchers[1]._id, title: "Neuroscience and Learning", description: "How the brain adapts to learning.", status: "active", startDate: new Date("2025-05-01"), endDate: new Date("2025-10-30") },
            { researcher: researchers[2]._id, title: "Social Media Influence", description: "A study on social media's effect on behavior.", status: "draft", startDate: new Date("2025-06-01"), endDate: new Date("2025-12-31") }
        ]);
        
        await Artefact.insertMany([
            { project: studies[0]._id, researcher: researchers[0]._id, title: "AI-generated Images", description: "Examples of AI-generated art.", fileUrl: "https://example.com/image1.png", fileType: "image", fileSize: 204800 },
            { project: studies[0]._id, researcher: researchers[0]._id, title: "Decision-making Video", description: "A video on AI-driven choices.", fileUrl: "https://example.com/video1.mp4", fileType: "video", fileSize: 1048576 },
            { project: studies[1]._id, researcher: researchers[1]._id, title: "Brain Activity Scan", description: "MRI scan of a learning brain.", fileUrl: "https://example.com/image2.png", fileType: "image", fileSize: 307200 },
            { project: studies[1]._id, researcher: researchers[1]._id, title: "Neural Response Audio", description: "Audio clip of brainwaves.", fileUrl: "https://example.com/audio1.wav", fileType: "audio", fileSize: 512000 },
            { project: studies[2]._id, researcher: researchers[2]._id, title: "Social Media Impact Chart", description: "A graph on engagement trends.", fileUrl: "https://example.com/image3.png", fileType: "image", fileSize: 256000 }
        ]);
        
        console.log("Database populated successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error populating database:", error);
        mongoose.connection.close();
    }
}

populateDB();