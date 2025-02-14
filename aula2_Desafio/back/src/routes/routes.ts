import {Express} from 'express'
import express from 'express'
import toDo from './toDo.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/api', toDo)
}

