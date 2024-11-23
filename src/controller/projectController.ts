import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  const {title, content, tools, linkDeploy, linkRepository, category} = req.body;
  const imageUrl = req.file?.location;
  const userId = req.user?.id;

  console.log(imageUrl);

  if(!userId){
    res.status(401).json({error: 'Usuário não autenticado.'})
    return;
  }


  try{
    
    const project = await prisma.projects.create({
      data: {
        title: title,
        content: content,
        tools: tools,
        linkDeploy: linkDeploy,
        linkRepository: linkRepository,
        categories: category,
        imageUrl: imageUrl,
        userId: userId
      }
    });


    res.status(200).json({message: 'Projeto cadastrado com sucesso!', project});
  }catch(error){
    console.error('Error ao cadastrar o projeto', error);
    res.status(500).json({error: 'Problemas com o servidor. Tente novamente mais tarde!'});
  }
}

// get all
export const getProjects = async (req: Request, res: Response) => {  
  try{
    const projects = await prisma.projects.findMany();
    
    if(projects.length === 0){
      res.status(204).json({message: 'Não existem projetos criados.'});
      return;
    }

    res.status(200).json({projects});
  }catch(error){ 
    console.error('Error ao buscar todos os projetos: ' + error);
    res.status(500).json({error: 'Erro ao buscar projetos. Tente novamente mais tarde!'})
  }
}

// get one
export const getOneProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try{
    const project = await prisma.projects.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if(!project){
      res.status(404).json({message: 'Projeto não encontrado!'});
      return;
    }

    
    res.status(200).json({project});
  }catch(error){
    console.error('Error ao buscar o projeto: ' + error);
    res.status(500).json({error: 'Erro ao buscar o projeto. Tente novamente mais tarde!'})
  }
}

// editar
export const updateProject = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, content, tools, linkDeploy, linkRepository, category} = req.body;
  const userId = req.user?.id;

  try{
    const existProject = await prisma.projects.findUnique({
      where:{
        id: parseInt(id)
      }
    });

    if(!existProject){
      res.status(404).json({message: 'Projeto não encontrado.'});
      return;
    }

    const updateProject = await prisma.projects.update({
      where:{
        id: parseInt(id)
      },
      data: {
        title: title,
        content: content,
        tools: tools,
        linkDeploy: linkDeploy,
        linkRepository: linkRepository,
        categories: category,
        userId: userId
      }});

    res.status(200).json({message: 'Projeto atualizado com sucesso.', project: updateProject})
  }catch(error){
    console.error('Error ao atualizar projeto: ' + error);
    res.status(500).json({error: 'Erro ao atualizar projeto. Tente novamente mais tarde!'})
  }
}

// excluir
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try{
    await prisma.projects.delete({
      where: {
        id: parseInt(id)
      }
    })
    
    res.status(200).json({message: 'Projeto removido com sucesso!'});
  }catch(error){
    console.error('Error ao excluir projeto: ' + error);
    res.status(500).json({error: 'Erro ao excluir projeto. Tente novamente mais tarde!'})
  }
}