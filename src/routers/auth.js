import express from 'express';
import {register, login} from '../controllers/authController.js';


//authRouter
const router = express.Router();

//register api
router.post('/register', register);
//login api
router.post('/login', login);

export default router;