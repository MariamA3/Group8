const express = require("express");
const router = express.Router();
const studyController = require('../controllers/studyController'); 

router.get("/studies", studyController.getStudies);
router.get("/studies/:id", studyController.getStudyById);
router.put('/studies/:id', studyController.updateStudy);
router.post('/studies', studyController.createStudy); 
router.delete('/studies/:id', studyController.deleteStudy);



module.exports = router;
