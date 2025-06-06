import express from 'express';
const router = express.Router();
import { submitResponses } from '../controllers/responseController.js';

router.post('/', submitResponses);

export default router;