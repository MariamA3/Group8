const mongoose = require("mongoose");
const dbConnection = require("./dbConnection.js");
const Researcher = require("./models/researcher");
const Study = require("./models/Study");
const Artefact = require("./models/Artefact");

async function populateDB() {
    try {
        await dbConnection();
        await mongoose.connection.db.dropDatabase();
        
        const researcher = await Researcher.create({
            name: "Alice Johnson",
            email: "alice@example.com",
            passwordHash: "hashedpassword123",
        });
        
        const study = await Study.create({
            researcher: researcher._id,
            title: "AI and Human Behavior",
            description: "A study on how AI affects human decision-making.",
            status: "active",
            startDate: new Date("2025-04-01"),
            endDate: new Date("2025-09-30"),
        });

        const artefact = await Artefact.create({
            project: study._id,
            researcher: researcher._id,
            title: "Example Video",
            description: "A sample research video.",
            fileUrl: "https://example.com/video.mp4",
            fileType: "video",
            fileSize: 1048576,
        });
        
        console.log("Database populated successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error populating database:", error);
        mongoose.connection.close();
    }
}

populateDB();
