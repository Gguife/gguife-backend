import {query, Request, Response} from 'express';
import prisma from '../config/client';

const handleError = (error: any, res: Response, customMessage: string) => {
  console.error(customMessage, error);
  res.status(500).json({error: customMessage});
}

const validateId = (id: any, res: Response): boolean => {
  if(isNaN(id) || id <= 0){
    res.status(400).json({error: 'Id inválido.'});
    return false;
  }

  return true;
}



export const createArticle = async (req: Request, res: Response) => {
  const {title, introduction, content} = req.body;
  const imageUrl = req.file?.location;
  const userId = req.user?.id;

  const tagIdInt = parseInt(req.body.tagId, 10);
  if(isNaN(tagIdInt)) {
    res.status(400).json({message: 'Id de tag inválido!'});
  }

  const articleData = {
    title: title,
    introduction: introduction,
    content: content,
    imageUrl: imageUrl,
    userId: userId as number,
    tagId: tagIdInt
  }

  try {
    const article = await prisma.articles.create({
      data: articleData
    });


    res.status(200).json({message: 'Artigo cadastrado com sucesso!', article});
  }catch(error: any) {
    handleError(error, res, 'Error ao cadastrar artigo!');
  }
}


export const getOneArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.id);

  if(!validateId(articleId, res)) return;

  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: articleId,
      }
    });

    if(!article){
      res.status(404).json({message: 'Artigo não encontrado.'});
      return;
    }

    res.status(200).json({article});
  }catch(error: any){
    handleError(error, res, 'Erro ao buscar o projeto selecionado.');
  }
}

export const getArticles = async (req: Request, res: Response) => {
  const search = String(req.query.search || '').trim();
  const take = Math.min(Number(req.query.take) || 12, 100);
  const skip = Math.max(Number(req.query.skip) || 0, 0);

  const { username } = req.query;

  if(!username || typeof username !== 'string') {
    res.status(400).json({error: 'Nome de usuário inválido ou não fornecido.'});
    return;
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      }
    });

    const [articles, totalArticles] = await prisma.$transaction([
      prisma.articles.findMany({
        where: {
          userId: user?.id,
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        take,
        skip,
        select: {id: true, title: true, introduction: true, imageUrl: true},
      }),
      prisma.articles.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        }
      })
    ])


    if(articles.length ===0) {
      res.status(404).json({message: 'Nenhum artigo cadastrado!'});
      return;
    }

    res.status(200).json({articles, totalArticles});
  }catch(error: any) {
    handleError(error, res, 'Erro ao buscar o projeto. Tente novamente mais tarde!');
  }
}

// Edite artigos
export const updateArticle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {title, introduction, content } = req.body;
  const userId = req.user?.id; 

  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: id,
      }
    });

    if(!article) {
      res.status(404).json({message: 'Projeto nao encontrado.'});
      return;
    }
    
    if(article.userId !== userId) {
      res.status(403).json({message: 'Voce nao tem permissao para atualizar este artigo.'});
      return;
    }




  }catch(error: any) {
    handleError(error, res, '');
  }
}



// Delete artigos
