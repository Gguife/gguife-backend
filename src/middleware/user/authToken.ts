import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret';

export const authToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')?.replace('Bearer', '').trim();
  if(!token) {
    res.status(401).send('Acesso negado!');
    return;
  }

  try{ 
    const verified = jwt.verify(token, SECRET_KEY) as User;

    req.user = verified;
    next();
  }catch(error){
    res.status(403).send('Token inválido ou expirado!');
  }
}