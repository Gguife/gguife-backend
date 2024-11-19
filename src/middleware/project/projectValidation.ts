import { Request, Response, NextFunction } from "express";

const isFieldEmpty = (field: string) => !field || field.trim().length === 0;

const projectValidate = async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, tools, linkRepository, category } = req.body;
    
  const requiredFields = [
    {field: 'título', value: title},
    {field: 'conteúdo', value: content},
    {field: 'ferramentas', value: tools},
    {field: 'link repository', value: linkRepository},
    {field: 'categoria', value: category}
  ];

  for(const {field, value} of requiredFields){
    if(isFieldEmpty(value)){
      res.status(400).json({message: `O campo ${field} é obrigatório!`})
      return;
    }
  }

  if(!req.file){
    res.status(400).json({message: 'A imagem é dobrigatória!'});
    return;
  }

  next();
}


export default projectValidate;