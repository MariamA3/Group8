const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Researcher = require("./models/researcher");
const Study = require("./models/study");
const Artefact = require("./models/artefact");
const Participant = require("./models/participant");
const Feedback = require("./models/feedback");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // clear the collections
    await Promise.all([
      Researcher.deleteMany(),
      Study.deleteMany(),
      Artefact.deleteMany(),
      Participant.deleteMany(),
      Feedback.deleteMany(),
    ]);

    // create a researcher
    const researcher = await Researcher.create({
      name: "Dr. Said ",
      email: "mariam@example.com",
      passwordHash: "testings", 
    });

    const studies = [];

    for (let i = 1; i <= 2; i++) {
      const study = await Study.create({
        researcher: researcher._id,
        title: `AI vs Human Study ${i}`,
        description: `A study to evaluate human perception of AI vs human-generated content (Phase ${i}).`,
        status: "active",
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      studies.push(study);

      for (let j = 1; j <= 2; j++) {
        const artefact = await Artefact.create({
          study: study._id,
          researcher: researcher._id,
          title: `Artefact ${j} (Study ${i})`,
          description: "Generated artefact for testing perception.",
          fileUrl: `https://picsum.photos/200/300`,
        });

        for (let k = 1; k <= 2; k++) {
          const participant = await Participant.create({});
          await Feedback.create({
            artefact: artefact._id,
            participant: participant._id,
            rating: Math.floor(Math.random() * 5) + 1,
            comment: Math.random() > 0.5 ? "Looks real to me." : "Feels AI-generated.",
          });
        }
      }
    }

    console.log(" Dummy data successfully inserted.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
