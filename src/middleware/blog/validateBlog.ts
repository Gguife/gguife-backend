import { Request, Response, NextFunction } from "express";

const isFieldEmpity = (field: string) => !field || field.trim().length === 0; 

export const validationsArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { title, introduction, content, image } = req.body;

  if(isFieldEmpity(title)){
    return res.status(400).json({message: 'O título é obrigatório!'})
  }

  if(isFieldEmpity(introduction)){
    return res.status(400).json({message: 'A introdução é obrigatório!'})
  }

  //Campo content
  if(isFieldEmpity(content)){
    return res.status(400).json({message: 'O conteúdo é obrigatório!'})
  }
  if(content.length < 10 || content.length > 1000){
    return res.status(400).json({message: 'O conteúdo deve ter entre 10 a 1000 caracteres!'})
  }


  //Verificar imagem e url da imagem (aws)

  next();
};