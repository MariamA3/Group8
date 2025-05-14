const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const dbConnection = require('./dbConnection');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables from .env file
dotenv.config();

// db connection
dbConnection();

// for debugging
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Add routes
const routes = ['artefactRoutes', 'studyRoutes', 'invitationRoutes'];
routes.forEach(route => {
    app.use('/api', require(`./routes/${route}`));
});

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads")); // Serve static files

// Connect upload route
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes); // Connect the route

// Serving the frontend build files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;