import express, { Request, Response, Router } from 'express';
import { createUser, getUsers, deleteUser } from '../controllers/UserController.ts'; // Corrigindo o import

const router: Router = express.Router();

router.post('/register', createUser);

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
