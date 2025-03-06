const loginUser = (req, res) => {
    res.json({ message: "Login successful!" });
  };
  
  const registerUser = (req, res) => {
    res.json({ message: "User registered successfully!" });
  };
  
  // Debugging: Log to check if functions exist
  console.log("Exporting authController functions:", { loginUser, registerUser });
  
  module.exports = { loginUser, registerUser };
  