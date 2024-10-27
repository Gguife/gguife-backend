import { Request, Response, Router } from 'express';
import validateUser from '../middleware/user/validateUser';
import { createUser, deleteUser, loginUser } from '../controller/userContorller';
const router = Router();


router.post('/article/user/register', validateUser.credentialRegister, createUser); 
router.post('/article/user/login', validateUser.credentialLogin, loginUser); 
router.post('/article/user/:id', validateUser.credentialLogin, deleteUser); 


export default router;