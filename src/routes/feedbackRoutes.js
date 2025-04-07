const express = require('express');
const router = express.Router();
const Feedback = require('../controllers/feedbackController')


//sjekke disse
router.get('/Feedback', Feedback.getFeedback);
router.get('/Feedback/:id', Feedback.getFeedbackById);
router.post('/Feedback', Feedback.createFeedback)
router.put('/Feedback/:id', Feedback.updateFeedback);
router.delete('/Feedback/:id', Feedback.deleteFeedback)

module.exports = router;