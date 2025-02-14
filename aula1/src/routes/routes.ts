import {Express} from 'express'
import express from 'express'
import person from './person.ts'

export default function (app : Express) {
    app
        .use(express.json())
        .use('/user', person)
}