import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, validateStrongPassword } from "../service/user/passwordService";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret';


export const createUser = async (req: Request, res: Response) => {
  const {username, password} = req.body;


  try{
    const validationErrosPassword = await validateStrongPassword(password)
    if(validationErrosPassword.length > 0){
      res.status(400).json({error: validationErrosPassword});
      return;
    }

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

export const allUsers = async (req: Request, res: Response) => {
  try{
    const users = await prisma.user.findMany();

    res.status(200).json({ users });
  }catch(error){
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários. Tente novamente mais tarde.' });
  }
}

export const loginUser = async (req: Request, res: Response) => {

  try{
    const {id, username} = req.user!;

    const token = jwt.sign({id, username}, SECRET_KEY, {expiresIn: '5h'} );

    res.status(200).json({message: 'Login bem-sucedido', token: token});
  }catch(error){
    console.error('Erro ao realizar o login:', error);
    res.status(500).json({ error: 'Erro ao realizar o login. Tente novamente mais tarde.' });
  }
}


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;  

  try {
    await prisma.user.delete({where: {id: parseInt(id)}});

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
  }catch(error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário. Tente novamente mais tarde.' });
  }
}