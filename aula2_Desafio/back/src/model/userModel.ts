import express, { Request, Response, Router } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const router: Router = express.Router();

interface IUser extends Document {
  name: string;
  email: string;
  pass: string;
}

const personSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
});

/*mongoose.models.IUser: Aqui, o código está verificando se um modelo já foi registrado com o nome IUser (o nome do modelo é User, mas a variável está utilizando IUser como uma convenção para indicar o tipo). Se o modelo já foi registrado anteriormente, o Mongoose vai retornar esse modelo.
mongoose.model<IUser>('User', personSchema): Caso o modelo IUser não tenha sido registrado ainda, ele é criado com o nome User e o esquema personSchema. O IUser aqui é uma interface TypeScript, e o personSchema é o esquema de dados que define como os documentos da coleção User serão estruturados.*/
const user = mongoose.models.IUser || mongoose.model<IUser>('User', personSchema);

export default user;
