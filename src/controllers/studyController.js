const createStudy = (req, res) => {
    res.json({ message: "Study created successfully!" });
  };
  
  // Debugging log to confirm function export
  console.log("Exporting studyController functions:", { createStudy });
  
  module.exports = { createStudy };
  