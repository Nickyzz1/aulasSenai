import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import userModel from '../model/userModel.ts';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config(); 

class AuthController {
  // Função de login
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, pass } = req.body;

      if (!email || !pass) {
        res.status(400).send("Informações faltando: e-mail ou senha.");
        return;
      }
      const user = await userModel.findOne({ email }); 
      if (!user) {
        res.status(404).send("Usuário não encontrado.");
        return;
    }
    
    const bytes = CryptoJS.AES.decrypt(user.pass, process.env.SECRET as string);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8); 

    if (decryptedPassword !== pass) {
      res.status(401).send("Senha incorreta.");
      return;
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
}

export default AuthController;
