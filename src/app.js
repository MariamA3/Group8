const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const dbConnection = require('./dbConnection');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

/// Load environment variables from .env file
dotenv.config();

//db connection
dbConnection()

//for debugging
app.get("/", (req, res) => {
    res.send("Server is running!");
  });  



//legg til routes her sp slipper vi mange linjer
//'authRoutes', 'studyRoutes', <--remove dfor debugging app.js
const routes = [ 'artefactRoutes' ];
routes.forEach(route => {
    app.use('/api', require(`./routes/${route}`));
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;


