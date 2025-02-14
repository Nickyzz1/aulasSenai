import express from 'express'
import initRoutes from './routes/routes.ts'

const app = express()
const port = 8080

initRoutes(app)

app.listen(port, () => console.log(`acesse : http://localhost:${port}/`))
