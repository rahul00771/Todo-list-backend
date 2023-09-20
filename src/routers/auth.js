import express from 'express';
import register from '../controllers/authController.js';

const router = express.Router();

//register api
router.post('/register', register);

export default router;