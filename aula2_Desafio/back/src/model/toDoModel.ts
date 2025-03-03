import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

const router : Router = express.Router();

interface IList extends Document {
    title: string;
    description: string[];
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const listSchema: Schema = new Schema({
    title : { type: String, required: true },
    description: { type: [String], required: true },
    completed: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const List = mongoose.model<IList>('List', listSchema);

export default List ;