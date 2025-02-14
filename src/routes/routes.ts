import {Express} from 'express'
import express from 'express'
import person from './PersonExemple.ts'
import user from './User.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/api', user)

}

