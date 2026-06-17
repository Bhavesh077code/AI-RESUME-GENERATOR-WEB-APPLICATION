
import express from 'express';
import { registerUser } from '../controller/authController/userRegisterController.js.js';
import { loginUser } from '../controller/authController/userLoginController.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;