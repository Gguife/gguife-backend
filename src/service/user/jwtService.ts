import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const secret_key_token = process.env.JWT_SECRET || 'defaultSecret';

export const generateToken = (playload: object) => {
  const token = jwt.sign(playload, secret_key_token, {
    expiresIn: '3d'
  });

  return token;
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret_key_token) as User;
}