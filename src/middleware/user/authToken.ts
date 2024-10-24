import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../service/user/jwtService";

export const authToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')?.replace('Bearer', '');
  if(!token) return res.status(401).send('Acesso negado!');

  try{ 
    const verified = verifyToken(token);

    req.user = verified;
    
    next();
  }catch(error){
    return res.status(403).send('Token inválido ou expirado!');
  }
}