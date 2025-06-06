import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Researcher from "../src/models/researcher.js";

dotenv.config();

const seedResearcher = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const email = "researcher@ntnu.no";

    // Remove existing user with same email
    await Researcher.deleteOne({ email });

  const hashedPassword = await bcrypt.hash("password123", 10);

const user =await Researcher.create({
  name: "Test Researcher",
  email: "researcher@ntnu.no",
  passwordHash: hashedPassword,
});

    console.log("Seeded researcher:", user);
    process.exit();
  } catch (err) {
    console.error("Error seeding researcher:", err);
    process.exit(1);
  }
};

seedResearcher();
