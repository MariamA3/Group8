import express from 'express';
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import { getArtefacts, getArtefactById, createArtefact, updateArtefact, deleteArtefact } from '../controllers/artefactController.js';

//kanskje endre til /studies/:id/artefacts? , blir 3 levels som kanskje ikke er så bra 
router.get('/artefacts', auth, getArtefacts);
router.get('/artefacts/:id', auth, getArtefactById);
router.post('/artefacts', auth, createArtefact)
router.put('/artefacts/:id', auth, updateArtefact);
router.delete('/artefacts/:id', auth, deleteArtefact)


export default router;