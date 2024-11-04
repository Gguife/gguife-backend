import { Request, Response, Router } from 'express';
import validateUser from '../middleware/user/validateUser';
import { authToken } from '../middleware/user/authToken';
import { createUser, deleteUser, loginUser, allUsers } from '../controller/userContorller';
const router = Router();


router.post('/article/user/register', validateUser.credentialRegister, createUser); 
router.post('/article/user/login', validateUser.credentialLogin, loginUser); 
router.post('/article/user/:id', validateUser.credentialLogin, deleteUser); 
router.get('/article/users', authToken, allUsers); 


export default router;