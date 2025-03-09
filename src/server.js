const dotenv = require('dotenv');
const app = require("./app");
const connectDB = require('./config/db'); 

dotenv.config({ path: '.env' }); 

//debug
console.log("MONGO_URI:", process.env.MONGO_URI); 

//byttet da port 5000 blir brukt av cc
const PORT = process.env.PORT || 5001; 

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});