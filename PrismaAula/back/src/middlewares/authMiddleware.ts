import { Request, Response, NextFunction } from "express";

export const validadeRegister = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name ) 
        res.status(400).json({ error: "informações faltantes obrigatórias" });
    
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    if (!email || !password) 
        res.status(400).json({ error: "E-mail e senha são obrigatórios" });

    next();
};