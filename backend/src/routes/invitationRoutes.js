import express from 'express';
const router = express.Router();
import { getInvitations, getInvitationById, createInvitation, deleteInvitation } from '../controllers/invitationController.js'; 
import { auth } from "../middleware/authMiddleware.js";


//sjekke disse
router.get("/invitation", auth, getInvitations);
router.get("/invitation/:id", auth, getInvitationById);
router.post('/invitation', auth, createInvitation); 
router.delete('/invitation/:id', auth, deleteInvitation);



export default router;
