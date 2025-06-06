import express from 'express';
const router = express.Router();
import { getParticipants, getParticipantById, createAParticipant, updateParticipant, deleteParticipant } from '../controllers/participantController.js';

router.get('/participants', getParticipants);
router.get('/participants/:id', getParticipantById);
router.post('/participants', createAParticipant)
router.put('/participants/:id', updateParticipant);
router.delete('/participants/:id', deleteParticipant)

export default router;