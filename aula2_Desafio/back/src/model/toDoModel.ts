import express, {Request, Response, Router} from 'express'
import mongoose, { Schema, Document } from 'mongoose';

const router : Router = express.Router();

interface IList extends Document {
    title: string;
    description: string[];
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const listSchema: Schema = new Schema({
    title : { type: String, required: false },
    description: { type: [String], required: false },
    completed: { type: String, required: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

/*O mongoose.model cria ou obtém um modelo de dados no Mongoose.
'List' é o nome do modelo, que também será o nome da coleção no banco de dados (o Mongoose usa uma convenção para pluralizar o nome do modelo, então ele procurará por uma coleção chamada lists no banco de dados).
listSchema é o esquema que define a estrutura dos documentos dessa coleção. O listSchema especifica como os dados de cada documento na coleção lists devem ser organizados (quais campos existem, seus tipos, validações, etc.).*/
const List = mongoose.model<IList>('List', listSchema);

export default List ;