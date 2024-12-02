import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  const {title, content, tools, linkDeploy, linkRepository, categoryId} = req.body;
  const imageUrl = req.file?.location;
  const userId = req.user?.id;

  if(!userId){
    res.status(401).json({error: 'Usuário não autenticado.'})
    return;
  }
  
  try{

    const categoryIdInt = parseInt(req.body.categoryId, 10); // Converte a string de volta para um número


    const category = await prisma.categories.findUnique({
      where: {
        id: categoryIdInt,
      }
    })

    if(!category) {
      res.status(400).json({error: "Categoria não encontrada."});
      return;
    }

    const project = await prisma.projects.create({
      data: {
        title: title,
        content: content,
        tools: tools,
        linkDeploy: linkDeploy,
        linkRepository: linkRepository,
        categoryId: category.id,
        imageUrl: imageUrl,
        userId: userId
      }
    });


    res.status(200).json({message: 'Projeto cadastrado com sucesso!', project});
  }catch(error){
    console.log('Error ao cadastrar o projeto', error);
    res.status(500).json({error: 'Problemas com o servidor. Tente novamente mais tarde!'});
  }
}

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

export const updateProject = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, content, tools, linkDeploy, linkRepository} = req.body;
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
        userId: userId
      }});

    res.status(200).json({message: 'Projeto atualizado com sucesso.', project: updateProject})
  }catch(error){
    console.error('Error ao atualizar projeto: ' + error);
    res.status(500).json({error: 'Erro ao atualizar projeto. Tente novamente mais tarde!'})
  }
}

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


export const createCategory = async (req: Request, res: Response) => {
  const {name} = req.body;

  try{

    const category = await prisma.categories.create({
      data: {
        name: name,
      }
    });


    res.status(200).json({message: "Categoria criada com sucesso", category});
  }catch(error) {
    console.error('Erro ao criar categoria', error);
    res.status(500).json({ error: 'Erro ao criar categoria. Tente novamente mais tarde.' });
  }
}


export const getCategory = async (req: Request, res: Response) => {
  try{
    const categories = await prisma.categories.findMany();

    res.status(200).json({categories});
  }catch(error){
    console.error('Erro ao encontrar categorias', error);
    res.status(500).json({ error: 'Erro ao encontrar categorias. Tente novamente mais tarde.' });
  }
}