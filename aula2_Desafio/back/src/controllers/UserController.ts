import { Request, Response, NextFunction } from 'express';
import userModel from '../model/userModel.ts';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
      res.status(400).send("Não autorizado! Informações faltantes.");
      return;
    }

    const newUser = new userModel({ name, email, pass });
    await newUser.save();

    res.status(201).send(`Pessoa linda ${name} criada com sucesso!`);
  } catch (error) {
    next(error); 
    res.status(500).send("Internal server error");
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await userModel.find(); // Encontrar todos os usuários no banco de dados
        res.status(200).json(users); // Retorna os usuários como resposta
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  };
  
  // Função para excluir um usuário (DELETE)
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id; // Pega o ID do usuário da URL
      const deletedUser = await userModel.findByIdAndDelete(userId); // Exclui o usuário pelo ID
  
      if (!deletedUser) {
        res.status(404).send("Usuário não encontrado.");
      }
  
      res.status(200).send(`Usuário ${userId} excluído com sucesso!`);
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
};
