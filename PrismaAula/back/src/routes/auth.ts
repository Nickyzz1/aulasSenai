import express, { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController.ts';
import {validateLogin, validadeRegister} from '../middlewares/authMiddleware.ts'

const router: Router = express.Router();

router.post('/login', validateLogin ,AuthController.login);

router.post('/register', validadeRegister, AuthController.register);

export default router;