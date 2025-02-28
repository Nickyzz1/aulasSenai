import express, { Request, Response, Router } from 'express';
import { getUsers, deleteUser } from '../controllers/UserController.ts'; // Corrigindo o import
import {validateLogin, validadeRegister} from '../middlewares/authMiddleware.ts'

const router: Router = express.Router();

router.get('/get', (req: Request, res: Response) => {
    getUsers(req, res); 
});

router.delete('/user/:id', (req: Request, res: Response) => {
    deleteUser(req, res); 
});

router.patch('/user/:id', (req: Request, res: Response) => {
    // implementar
});

export default router;
