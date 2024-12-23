import { Users } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret';

export const authToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')?.replace('Bearer', '').trim();
  if(!token) {
    res.status(401).json({error: 'Token de autenticação ausente!'});
    return;
  }

  try{ 
    const verified = jwt.verify(token, SECRET_KEY) as Users;

    req.user = verified;
    next();
  }catch(error){
    res.status(403).json({error: 'Token ínvalido ou expirado!'});
  }
}

export const generateToken = (id: number, username: string) => { 
  return jwt.sign({id, username}, SECRET_KEY, {expiresIn: '1d'} );
}