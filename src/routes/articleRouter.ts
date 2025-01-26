import { Router } from "express";
import {createArticle, getArticles, getOneArticle, updateArticle} from '../controller/articleController';
import { authToken } from "middleware/user/authToken";
import upload from "utils/multer";
import articleValidate from "middleware/article/aritcleValidation";

const router = Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getOneArticle);
router.get('/article', authToken, upload, articleValidate, createArticle);
router.get('/article/:id', authToken, updateArticle);


export default router;