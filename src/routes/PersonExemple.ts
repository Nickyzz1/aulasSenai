import express, { Request, Response, Router} from "express";

const router : Router = express.Router()
const people: object[] = []

router
    .post('/register', (req : Request, res : Response) => {
        const {nome, sobrenome} = req.body
        res.status(200).send(`Pessoa linda ${nome} ${sobrenome} recebida com sucesso!`)
    })

    .get('/getData', (req: Request, res : Response) => {
        const {nome, sobrenome} = req.query

        res.status(200).send("Fazneod query!")
    })

    .put('/user/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const { nome, sobrenome } = req.body;
        
        res.status(200).send(`Pessoa com o id: ${id} foi atualizado para
        ${nome} ${sobrenome}`)
    })

export default router;