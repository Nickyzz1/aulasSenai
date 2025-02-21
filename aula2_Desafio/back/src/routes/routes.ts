import {Express} from 'express'
import express from 'express'
import toDo from './toDo.ts'
import user from './user.ts'
import auth from './auth.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/api', toDo)
        .use('/user', user)
        .use('/auth', auth)

}

