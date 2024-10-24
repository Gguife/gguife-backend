import { Request, Response, Router } from 'express';
import { validateUserCredentialRegister } from '../middleware/user/validateUser';
import { createUser } from 'controller/userContorller';
const router = Router();


router.post('/register', validateUserCredentialRegister, createUser); 


export default router;