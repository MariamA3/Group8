import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Researcher from "../models/researcher.js";

const JWT_SECRET = process.env.JWT_SECRET

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Researcher.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await Researcher.create({ name, email, passwordHash: hashed });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Researcher.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (no user found)" });
    }

const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials (bad password)" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error); 
    res.status(500).json({ message: "Server error" });
  }
};


