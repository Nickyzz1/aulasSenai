import express, { Request, Response, Router} from "express";

const router : Router = express.Router()

let id = 1

type Person  = {

    id: number,
    nome: string,
    sobrenome : string
}

const people : Person[] = []

router
    .post('/user', (req : Request, res : Response) => {

        const {nome, sobrenome} = req.body

        if(people.length > 0) 
            id+=1
        
        people.push({id, nome, sobrenome})

        res.status(200).send(`Pessoa linda ${nome} ${sobrenome} recebida com sucesso!`)
    })

    .get('/user', (req: Request, res : Response) => {

        res.status(200).send(people)
    })

    .patch('/user/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const { nome, sobrenome } = req.body;

        for (let i = 0; i < people.length; i++) {
            if(people[i].id == parseInt(id)) {
                    if(nome.length > 0) 
                        people[i].nome = nome;
                    if(sobrenome.length > 0) 
                        people[i].sobrenome = sobrenome;
            }
            
        }
        res.status(200).send(`Pessoa com o id: ${id} foi atualizado para
        ${nome} ${sobrenome}`)
    })

    .put('/user/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const { nome, sobrenome } = req.body;

        for (let i = 0; i < people.length; i++) {
            if(people[i].id == parseInt(id)) {
                    if(nome != null && sobrenome != null) 
                        people[i].nome = nome;
                        people[i].sobrenome = sobrenome;
            }
            
        }
        res.status(200).send(`Pessoa com o id: ${id} foi atualizado para
        ${nome} ${sobrenome}`)
    })

    .delete('/user/:id', (req: Request, res: Response) => {
            const { id } = req.params;
            const { nome, sobrenome } = req.body;

            for (let i = 0; i < people.length; i++) {
                if(people[i].id == parseInt(id)) {
                        people.slice(people[i].id, 1)
                }
                
            }
            res.status(200).send(`Pessoa com o id: ${id} foi excluída`)
        }
    ) 


export default router;