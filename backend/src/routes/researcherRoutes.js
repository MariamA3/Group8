import express from 'express';
const router = express.Router();
import { getResearchers, getResearcherById, createAResearcher, updateResearcher, deleteResearcher } from '../controllers/researcherController';

router.get('/Researcher', getResearchers);
router.get('/Researcher/:id', getResearcherById);
router.post('/Researcher', createAResearcher)
router.put('/Researcher/:id', updateResearcher);
router.delete('/Researcher/:id', deleteResearcher)

export default router;