import { Request, Response, NextFunction } from "express";
import { passwordCompare, validateStrongPassword } from "../../service/user/passwordService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const isFieldEmpty = (field: string) => !field || field.trim().length === 0;


export const validateUserCredentialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;

  if(isFieldEmpty(username) || isFieldEmpty(password)){
    return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
  }

  try{
    const user = await prisma.user.findUnique({ where: { username } });
    if(!user) return res.status(404).json({error: 'Usuário não encontrado!'})

    const isMatch = await passwordCompare(password, user.password);
    if(!isMatch) return res.status(401).json({message: 'Credenciais inválidas!'})
  
    next();
  }catch(error) {
    return res.status(500).json({error: 'Error na autenticação. Tente novamente mais tarde!'})
  }
}


export const validateUserCredentialRegister = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;
  
  if (isFieldEmpty(username) || isFieldEmpty(password)) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    return;
  }

  try {
    const usernameVerify = await prisma.user.findUnique({ where: { username } });

    if (usernameVerify) {
      res.status(400).json({ message: 'Este nome de usuário já existe!' });
      return;
    }
    
    next();
  }catch(error){
    console.error('Erro ao validar credenciais do usuário:', error);
    res.status(500).json({ error: 'Erro ao verificar nome de usuário. Tente novamente mais tarde!' });
  }
}