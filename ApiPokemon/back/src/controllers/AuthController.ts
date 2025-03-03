import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
// imports internos
import { IUser } from '../model/user.ts';

const prisma = new PrismaClient();
dotenv.config();  // O Dotenv usa um arquivo .env, que contém as variáveis de ambiente do projeto 

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      // Buscando o usuário no banco de dados 
      const user = await prisma.user.findUnique({where: { email: email }});
      if (!user) 
        return res.status(404).send("Usuário não encontrado.");
    
      // encriptando a senha com Bcrypt
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET as string);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); 
      if (decryptedPassword !== password) 
        res.status(401).send("Senha incorreta.");

      // Gerando o token JWT
      const secret = process.env.SECRET;
      const token = jwt.sign(
        { id: user.id },
        secret as string,
        { expiresIn: '2d' }  // Token válido por 2 dias
      );

      return res.status(200).send({ token });
      
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro no servidor.");
    }
  }

  // função para registrar
  static register = async (userData: IUser) => {
    try {
      // Usando Prisma para criar o usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  };
}

export default AuthController;
