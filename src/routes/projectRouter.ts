import { Router } from 'express';
import { authToken } from '../middleware/user/authToken';
import { createProject, getOneProject, updateProject, deleteProject, getProjects } from '../controller/projectController';
import { createCategory, getCategory } from '../controller/categoryController';
import projectValidate from '../middleware/project/projectValidation';
import upload from '../utils/multer';

const router = Router();

router.get('/project/:id', getOneProject);
router.get('/projects', getProjects);
router.post('/project', authToken, upload, projectValidate, createProject);
router.put('/projects/:id', authToken, updateProject);
router.delete('/projects/:id', authToken, deleteProject);

//category
router.post('/category', authToken, createCategory);
router.get('/categories', getCategory);

export default router;