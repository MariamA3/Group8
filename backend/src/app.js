import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./dbConnection.js";
import path from "path";
import studyRoutes from "./routes/studyRoutes.js";
import artefactRoutes from "./routes/artefactRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
dotenv.config();
dbConnection();

app.get("/", (_, res) => res.send("Server is running!"));

// Apply routes
app.use("/api/auth", authRoutes);
app.use("/api", studyRoutes);
app.use("/api", artefactRoutes);
app.use("/api", invitationRoutes);
app.use("/api", participantRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/upload", uploadRoutes);

// Serve frontend
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(process.cwd(), "frontend/dist")));



app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
