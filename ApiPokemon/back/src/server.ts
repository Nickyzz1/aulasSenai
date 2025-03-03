import express from 'express'
import cors from 'cors'
import initRoutes from './routes/routes.ts'
import mongoose from 'mongoose';

const app = express()
const port = 8080

app.use(cors({
    origin: '*'
}))

initRoutes(app)

app.listen(port, () => console.log(`acesse : http://localhost:${port}/`))

mongoose.connect('mongodb://localhost:27017', {
  serverSelectionTimeoutMS: 5000,  // Timeout de 5 segundos para verificar se a conexão é bem-sucedida
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro de conexão:', err);
});