const express = require("express");
const router = express.Router();
const invitationController = require('../controllers/invitationController'); 

router.get("/invitation", invitationController.getStudies);
router.get("/invitation/:id", invitationController.getStudyById);
router.post('/invitation', invitationController.createStudy); 
router.delete('/invitation/:id', invitationController.deleteStudy);



module.exports = router;
