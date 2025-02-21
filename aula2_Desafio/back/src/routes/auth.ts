import express, { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController.ts';

const router: Router = express.Router();

router.post('/login', AuthController.login);

export default router;