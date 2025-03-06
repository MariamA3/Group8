const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studyRoutes = require("./routes/studyRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running!");
  });  

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/studies", studyRoutes);

module.exports = app;


