import { Request, Response } from "express";
import prisma from "../config/client";

// Função para validação de ID 
const validateId = (id: any, res: Response): boolean => { 
  const parsedId = Number(id); if(isNaN(parsedId) || parsedId <= 0) { 
    res.status(400).json({error: 'Id inválido.'}); 
    return false;
  } 
  return true; 
} 

// Função para tratamento de erros 
const handleError = (error: any, res: Response, customMessage: string) => { 
  console.error(customMessage, error); 
  res.status(500).json({error: customMessage}); 
} 

// Função para verificar se o usuário não está autenticado 
const checkUserAuth = (userId: any, res: Response): boolean => { 
  if(!userId) { 
    res.status(401).json({error: 'Usuário não autenticado.'}); 
    return false; 
  } 
  return true; 
}


export const createProject = async (req: Request, res: Response) => {
  const {title, content, tools, linkDeploy, linkRepository} = req.body;
  const imageUrl = req.file?.location;
  const userId = req.user?.id;
  
  if(!checkUserAuth(userId, res)) return;

  const categoryIdInt = parseInt(req.body.categoryId, 10);
  if(isNaN(categoryIdInt)){
    res.status(400).json({error: 'Id de categoria inválido'});
  }

  const projectData = {
    title: title,
    content: content,
    tools: tools,
    linkDeploy: linkDeploy,
    linkRepository: linkRepository,
    categoryId: categoryIdInt,
    imageUrl: imageUrl,
    userId: userId as number
  }

  try{
    const project = await prisma.projects.create({
      data: projectData,
    });

    res.status(200).json({message: 'Projeto cadastrado com sucesso!', project});
  }catch(error: any){
    if(error.code === 'P2003') { // Erro do prisma para violação de chave estrangeria
      res.status(400).json({error: "Categoria não encontrada."})
      return;
    }

    handleError(error, res, 'Error ao cadastrar o projeto.');
  }
}

export const getProjects = async (req: Request, res: Response) => {  
  const search = String(req.body.search || '').trim();
  const take = Math.min(Number(req.body.take) || 12, 100);
  const skip = Math.max(Number(req.body.skip) || 0, 0);

  try{
    //Executar contagem e busca em uma única transação
    const [projects, totalProjects] = await prisma.$transaction([
      prisma.projects.findMany({
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        take,
        skip
      }),
      prisma.projects.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        }
      })   
    ]);

    res.status(200).json({projects, totalProjects});
  }catch(error: any){ 
    handleError(error, res, 'Error ao buscar todos os projetos.');
  }
}

export const getOneProject = async (req: Request, res: Response) => {
  const projectId = Number(req.params.id);

  if(!validateId(projectId, res)) return;

  try{
    const project = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });


    if(!project) {
      res.status(404).json({error: 'Projeto não encontrado.'});
      return;
    }

    res.status(200).json({project});
  }catch(error: any){
    handleError(error, res, 'Erro ao buscar o projeto.');
  }
}

export const getUserProject = async (req: Request, res: Response) => {
  const { username } = req.query;

  if(!username || typeof username !== 'string') {
    res.status(400).json({error: 'Username inválido ou não fornecido'});
    return;
  }
  
  try{
    const user = await prisma.users.findUnique({
      where: {username: String(username)},
      select: {id: true} // Selecionando apenas o ID   
    })

    if(!user) {
      res.status(400).json({error: 'Usuário não encontrado'});
      return;
    }
    
    const projects = await prisma.projects.findMany({
      where: {
        userId: user.id,
      },
      select: {id: true, title: true, tools: true}, 
    })


    if(projects.length === 0) {
      res.status(404).json({message: 'Projetos não encontrados.'})
      return;
    }

    res.status(200).json({projects})
  }catch(error: any){
    console.error('Error ao buscar o projeto: ' + error.message);
    res.status(500).json({error: 'Erro ao buscar o projeto. Tente novamente mais tarde!'});
  }
}

export const updateProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {title, content, tools, linkDeploy, linkRepository} = req.body;
  const userId = req.user?.id;

  if(!checkUserAuth(userId, res)) return;

  if(!validateId(userId, res)) return;
 
  try{
    const existProject = await prisma.projects.findUnique({
      where:{
        id: id
      }
    });

    if(!existProject){
      res.status(404).json({message: 'Projeto não encontrado.'});
      return;
    }

    if(existProject.userId !== userId) {
      res.status(403).json({ message: 'Você não tem permissão para atualizar este projeto.' });
      return;
    }

    const updateProject = await prisma.projects.update({
      where:{
        id: id
      },
      data: {
        title: title,
        content: content,
        tools: tools,
        linkDeploy: linkDeploy,
        linkRepository: linkRepository,
        userId: userId
      }});

    res.status(200).json({message: 'Projeto atualizado com sucesso.', project: updateProject})
  }catch(error: any){
    handleError(error, res, 'Erro ao atualizar o projeto.');
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if(!validateId(id, res)) return;

  try{
    await prisma.projects.delete({
      where: {
        id: id
      }
    })
    
    res.status(200).json({message: 'Projeto removido com sucesso!'});
  }catch(error: any){
    handleError(error, res, 'Erro ao excluir projeto');
  }
}