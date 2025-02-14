import express, {Request, Response, Router} from 'express'
import mongoose, { Schema, Document } from 'mongoose';

const router : Router = express.Router();

interface IPerson extends Document {
    name: string;
    email: string;
    pass: string;
}

const personSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
});

const Person = mongoose.model<IPerson>('Person', personSchema);

export default Person ;