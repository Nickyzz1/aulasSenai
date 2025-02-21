import express, {Request, Response, Router} from 'express'
import { createTask, getTasks, deleteTask, updateTask } from '../controllers/TaskController.ts'; // Corrigindo o import

const router : Router = express.Router();

router.post('/task', createTask);

router.get('/task', (req: Request, res: Response) => {
    getTasks(req, res); 
});

router.delete('/task/:id', (req: Request, res: Response) => {
    deleteTask(req, res); 
});

router.patch('/task/:id', (req: Request, res: Response) => {
    updateTask(req, res); 
});

export default router;