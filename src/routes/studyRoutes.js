const express = require("express");
const studyController = require("../controllers/studyController"); // Import full object

const router = express.Router();

console.log("studyController:", studyController); // Debugging

router.post("/", studyController.createStudy);

module.exports = router;
