import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import userModel from '../model/userModel.ts';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

// O Dotenv usa um arquivo .env, que contém as variáveis de ambiente do projeto 
dotenv.config(); 

class AuthController {
  // Função de login
  static login = async (req: Request, res: Response) => {
    try {

      const { email, pass } = req.body; // pegando dados da requisição

      const user = await userModel.findOne({ email }); 
      if (!user) 
        res.status(404).send("Usuário não encontrado.");
      
    
      const bytes = CryptoJS.AES.decrypt(user.pass, process.env.SECRET as string);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); 

      if (decryptedPassword !== pass) {
        res.status(401).send("Senha incorreta.");
     
      }

      const secret = process.env.SECRET
      
      const token = jwt.sign(

        {
            id : user.id
        },
        secret as string, {
            expiresIn : '2 days'
        }
      )
    
      res.status(200).send({Token : token});

    } catch (error) {
      console.error(error);
      res.status(500).send("Erro no servidor.");
    }
  }

  // função para registrar
  static register = async (req : Request, res : Response) => {
      try {
        const { name, email, pass } = req.body;
    
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
      }
  }
}

export default AuthController;
