const dotenv = require('dotenv');
const app = require("./app");
const connectDB = require('./config/db'); 
const path = require('path');

dotenv.config({ path: '.env' }); 

// Serving the frontend build files.
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

//debug
console.log("MONGO_URI:", process.env.MONGO_URI); 

//byttet da port 5000 blir brukt av cc
const PORT = process.env.PORT || 5001; 

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
