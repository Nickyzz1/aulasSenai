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

const user = mongoose.models.IUser || mongoose.model<IUser>('User', personSchema);

export default user;
