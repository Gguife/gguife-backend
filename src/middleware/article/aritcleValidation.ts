import { Request, Response, NextFunction } from 'express';

const isFieldEmpty = (field: any) => !field || String(field).trim().length === 0;

const articleValidate  = async (req: Request, res: Response, next: NextFunction) => {
  const {title, introduction, content, imageUrl, tagId} = req.body;

  const requiredFields = [
    {field: 'título', value: title},
    {field: 'introdução', value: introduction},
    {field: 'conteúdo', value: content},
    {field: 'imagem', value: imageUrl},
    {field: 'tag', value: tagId},
  ];

  for(const {field, value} of requiredFields){
    if(isFieldEmpty(value)){
      res.status(400).json({message: `O campo ${field} é obrigatório!`});
      return; 
    }
  }

  if(introduction.length > 50) {
    res.status(400).json({message: 'A introdução deve ter no máximo 50 caracteres!'})
  }

  if(content.length < 10 || content.length > 1000) {
    res.status(400).json({message: 'O conteúdo deve ter entre 10 a 1000 caracteres!'});
  }

  if(isNaN(Number(tagId))){
    res.status(400).json({message: 'O campo das tags deve ser um número válido.'})
    return;
  }

  next();
}

export default articleValidate;
