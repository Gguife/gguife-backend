import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  const {name} = req.body;

  try{

    const category = await prisma.categories.create({
      data: {
        name: name,
      }
    });


    res.status(200).json({message: "Categoria criada com sucesso", category});
  }catch(error) {
    console.error('Erro ao criar categoria', error);
    res.status(500).json({ error: 'Erro ao criar categoria. Tente novamente mais tarde.' });
  }
}


export const getCategory = async (req: Request, res: Response) => {
  try{
    const categories = await prisma.categories.findMany();

    res.status(200).json({categories});
  }catch(error){
    console.error('Erro ao encontrar categorias', error);
    res.status(500).json({ error: 'Erro ao encontrar categorias. Tente novamente mais tarde.' });
  }
}