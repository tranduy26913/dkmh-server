import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/gethdid', AuthController.getHdID);
router.post('/dkmh', AuthController.postDKMH);

export default router;