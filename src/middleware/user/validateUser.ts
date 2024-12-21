import { Request, Response, NextFunction } from "express";
import { passwordCompare, validateStrongPassword } from "../../service/user/passwordService";
import prisma from "../../config/client";

const isFieldEmpty = (field: string) => !field || field.trim().length === 0;

const credentialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;

  if(isFieldEmpty(username) || isFieldEmpty(password)){
    res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    return;
  }

  try{
    const user = await prisma.users.findUnique({ where: { username } });
    if(!user) {
      res.status(404).json({error: 'Credenciais inválidas!'})
      return;
    }

    const isMatch = await passwordCompare(password, user.password);
    if(!isMatch) {
      res.status(401).json({message: 'Credenciais inválidas!'})
      return;
    }

    req.user = user;
      
    next();
  }catch(error) {
    console.error('Erro ao validar registro de usuário:', error);
    res.status(500).json({error: 'Error na autenticação. Tente novamente mais tarde!'})
  }
}


const credentialRegister = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;
  
  if (isFieldEmpty(username) || isFieldEmpty(password)) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    return;
  }

  try {    
    const usernameVerify = await prisma.users.findFirst({
       where: { 
        username: {
          equals: username, 
          mode: 'insensitive'
        } 
      } 
    });


    if (usernameVerify) {
      res.status(400).json({ message: 'Este nome de usuário já existe!' });
      return;
    }

    const validationErrosPassword = await validateStrongPassword(password)
    if(validationErrosPassword.length > 0){
      res.status(400).json({error: validationErrosPassword});
      return;
    }

    next();
  }catch(error){
    console.error('Erro ao validar registro de usuário:', error);
    res.status(500).json({ error: 'Erro ao verificar nome de usuário. Tente novamente mais tarde!' });
  }
}

export default {credentialLogin, credentialRegister, isFieldEmpty};