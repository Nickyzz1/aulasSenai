import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
// imports internos
import {prisma} from '../lib/prisma.ts'

dotenv.config();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany();
        res.status(200).json(users); 
    } catch (error) {
      console.log(error)
    }
};
  
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId), 
    },
  });
  
  if (!user) {
    res.status(404).send("Usuário não encontrado.");
  }
  
  await prisma.user.delete({
    where: {
      id: parseInt(userId), // Deletando pelo id
    },
  });
  
  res.status(200).send("Usuário deletado com sucesso.");  
  
};
