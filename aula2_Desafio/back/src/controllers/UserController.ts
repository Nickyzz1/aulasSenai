import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import userModel from '../model/userModel.ts'; 
import dotenv from 'dotenv'

dotenv.config();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userModel.find();
        res.status(200).json(users); 
    } catch (error) {
      console.log(error)
    }
  };
  
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id; 
      const deletedUser = await userModel.findByIdAndDelete(userId); 
  
      if (!deletedUser) 
        res.status(404).send("Usuário não encontrado.");
      res.status(200).send(`Usuário ${userId} excluído com sucesso!`);
    } catch (error) {
      console.log(error)
    }
};
