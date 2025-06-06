import express from 'express';
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import {
  getStudies,
  getStudyById,
  updateStudy,
  createStudy,
  deleteStudy
} from '../controllers/studyController.js';

router.get("/studies", getStudies);
router.get("/studies/:id", getStudyById);
router.put('/studies/:id', auth, updateStudy);
router.post('/studies', auth, createStudy);
router.delete('/studies/:id', auth, deleteStudy);


export default router;
