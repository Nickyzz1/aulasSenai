import {Express} from 'express'
import express from 'express'
import person from './person.ts'
import user from './user.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/api', user)

}

