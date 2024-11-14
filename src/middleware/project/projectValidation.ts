import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { validateImage } from "service/projects/imageService";

const prisma = new PrismaClient();

const isFieldEmpty = (field: string) => !field || field.trim().length === 0;
const options = {
  maxWidth: 1024,
  maxHeight: 768,
  maxSizeInBytes: 5 * 1024 * 1024
}

const projectValidationRegister = async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, tools, linkDeploy, linkRepository, image} = req.body;

  if(isFieldEmpty(title) || isFieldEmpty(content) || isFieldEmpty(image) || isFieldEmpty(linkRepository)){
    res.status(400).json({message: 'Preencha os campos obrigatórios!'})
    return;
  }

  try{

    const isImageValid = await validateImage(image, options)
    
    

    next();
  }catch(error) {
    console.error('Erro ao validar registro de projeto:', error);
    res.status(500).json({error: 'Error na autenticação. Tente novamente mais tarde!'})
  }
}


export default projectValidationRegister;