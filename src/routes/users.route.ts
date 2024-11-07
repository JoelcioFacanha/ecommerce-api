import express, { Request, Response } from 'express';

export const userRoutes = express.Router();

type User = {
    id: number;
    nome: string;
    email: string;
};

let id = 0;
let usuarios: User[] = [];

userRoutes.get('/users', (req: Request, res: Response) => {
    res.send(usuarios);
});

userRoutes.get('/users/:id', (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = usuarios.find(u => u.id === userId);
    res.send(user);
});

userRoutes.post('/users', (req: Request, res: Response) => {
    let user = req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({ mesage: 'Usuário criado com sucesso!' });
});

userRoutes.put('/users/:id', (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let user = req.body;

    let index = usuarios.findIndex(u => u.id === id);

    usuarios[index].nome = user.nome;
    usuarios[index].email = user.email;

    res.send('Usuário atualizado com sucesso!');
});

userRoutes.delete('/users/:id', (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let index = usuarios.findIndex(u => u.id === id);
    usuarios.splice(index, 1);
    res.send('Usuário removido com sucesso!');
});