const app = require("./app"); // Correct path
const { connectDB } = require("./config/db"); // Corrected import
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
