import mongoose from "mongoose";
import dotenv from "dotenv";
import Study from "../src/models/study.js";

dotenv.config();

const seedStudy = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const researcherId = "6842acbe89e689b87126db36";

    // Optional: clear existing dummy studies
    await Study.deleteMany({ title: "Dummy Study" });

    const study = await Study.create({
      title: "Dummy Study",
      description: "This is a seeded study for testing the dashboard.",
      status: "draft", // or 'active' / 'completed'
      researcherId,
      createdAt: new Date(),
    });

    console.log("Seeded study:", study);
    process.exit();
  } catch (err) {
    console.error("Error seeding study:", err);
    process.exit(1);
  }
};

seedStudy();
