import { Router } from 'express';
import validateUser from '../middleware/user/validateUser';
import { authToken } from '../middleware/user/authToken';
import { createUser, deleteUser, loginUser, allUsers, oneUser } from '../controller/userContorller';
const router = Router();


router.get('/users', authToken, allUsers); 
router.get('/user/:id', authToken, oneUser); 
router.post('/user/register', validateUser.credentialRegister, createUser); 
router.post('/login', validateUser.credentialLogin, loginUser); 
router.delete('/user/:id', authToken, deleteUser); 


export default router;