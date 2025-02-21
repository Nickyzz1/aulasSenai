import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import userModel from '../model/userModel.ts'; 
import dotenv from 'dotenv'

dotenv.config();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
      res.status(400).send("Informações faltando: nome, e-mail ou senha.");
      return;
    }

    const passHash = CryptoJS.AES.encrypt(pass, process.env.SECRET as string).toString();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).send("E-mail já registrado.");
      return;
    }

    const newUser = new userModel({ name, email, pass:passHash });

    await newUser.save();

    res.status(201).send(`Pessoa linda ${name} criada com sucesso!`);
    
  } catch (error) {
    console.error(error);
  }''
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userModel.find();
        res.status(200).json(users); 
    } catch (error) {
      
    }
  };
  
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id; 
      const deletedUser = await userModel.findByIdAndDelete(userId); 
  
      if (!deletedUser) {
        res.status(404).send("Usuário não encontrado.");
      }
  
      res.status(200).send(`Usuário ${userId} excluído com sucesso!`);
    } catch (error) {
      
    }
};
