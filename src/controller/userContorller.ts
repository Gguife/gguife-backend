import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "service/user/passwordService";

const prisma = new PrismaClient();


export const createUser = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try{

    const hashpassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashpassword
      }
    }) 

    res.status(200).json({message: 'usuário criado com sucesso!', user})
  }catch(error){
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário. Tente novamente mais tarde.' });
  }
}