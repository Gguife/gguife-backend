import { Request, Response, NextFunction } from "express";
import passwordService from "../../service/user/passwordService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const validateUserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;

  try{
    const user = await prisma.user.findUnique({ where: { username } });
    if(!user) return res.status(404).json({error: 'Usuário não encontrado!'})
  
    const isMatch = await passwordService.passwordCompare(password, user.password);
    if(!isMatch) return res.status(401).json({message: 'Credenciais inválidas!'})
  
    next();
  }catch(error) {
    return res.status(500).json({error: 'Error na autenticação. Tente novamente mais tarde!'})
  }
}