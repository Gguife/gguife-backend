import { Router } from 'express';
import { authToken } from '../middleware/user/authToken';
import { createProject, getProjects, getOneProject, updateProject, deleteProject } from '../controller/projectController';
import projectValidate from '../middleware/project/projectValidation';
import upload from '../middleware/project/multer';

const router = Router();

router.get('/projects', getProjects);
router.get('/project/:id', getOneProject);
router.post('/project', authToken, upload, projectValidate, createProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

export default router;