import express, {Request, Response, Router} from 'express'
import mongoose, { Schema, Document } from 'mongoose';

const router : Router = express.Router();

interface IList extends Document {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const listSchema: Schema = new Schema({
    title : { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const Person = mongoose.model<IList>('Person', listSchema);

export default Person ;