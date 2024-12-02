import { Request, Response, NextFunction } from "express";

const isFieldEmpty = (field: any) => !field || String(field).trim().length === 0;

const projectValidate = async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, tools, linkRepository, categoryId } = req.body;
    
  const requiredFields = [
    {field: 'título', value: title},
    {field: 'conteúdo', value: content},
    {field: 'ferramentas', value: tools},
    {field: 'link repository', value: linkRepository},
    {field: 'categoria', value: categoryId}
  ];

  for(const {field, value} of requiredFields){
    if(isFieldEmpty(value)){
      res.status(400).json({message: `O campo ${field} é obrigatório!`})
      return;
    }
  }

  if (isNaN(Number(categoryId))) {
    res.status(400).json({message: 'O campo categoria deve ser um número válido.'});
    return;
  }

  next();
}


export default projectValidate;