import { Request, Response, NextFunction } from 'express';
import taskModel from '../model/toDoModel.ts';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const {title, description, completed, createdAt, updatedAt } = req.body;

    const newTask = new taskModel({title, description, completed, createdAt, updatedAt });
    await newTask.save();

    res.status(201).send(`tarefa criada com sucesso!`);

  } catch (error) {
   
    res.status(500).send( `Internal server error ${error}`);
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await taskModel.find(); // Encontrar todos os usuários no banco de dados
        res.status(200).json(tasks); // Retorna os usuários como resposta
    } catch (error) {
      res.status(404).send('Not found')
    }
  };
  
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id; 
  
      const deleteTask = await taskModel.findByIdAndDelete(taskId); // Exclui o usuário pelo ID
  
      if (!deleteTask) {
        res.status(404).send("Usuário não encontrado.");
      }
  
      res.status(200).send(`Usuário ${taskId} excluído com sucesso!`);
    } catch (error) {
      res.status(500).send('Internal server error')

    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {

  const { id } = req.params; 
  const { title, description, completed } = req.body; 

    try {
        // Encontre a tarefa pelo ID e atualize os campos
        const updatedTask = await taskModel.findOneAndUpdate(
          { id: parseInt(id) }, // Busca a tarefa pelo id
          {
              $set: {
                  title: title || undefined, 
                  description: description || undefined, 
                  completed: completed !== undefined ? completed : undefined, 
                  updatedAt: new Date() 
              }
          },
          { new: true } // Retorna o documento atualizado
      );

        if (!updatedTask) {
            res.status(404).send('Tarefa não encontrada');
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).send('Erro ao atualizar tarefa');
    }
 
};
