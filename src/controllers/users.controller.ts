import { Request, Response } from "express";

type User = {
    id: number;
    nome: string;
    email: string;
};

let id = 0;
let usuarios: User[] = [];

export class UserController {
    static getAll(req: Request, res: Response) {
        res.send(usuarios);
    }

    static getUserById(req: Request, res: Response) {
        let userId = Number(req.params.id);
        let user = usuarios.find(u => u.id === userId);
        res.send(user);
    }

    static save(req: Request, res: Response) {
        let user = req.body;
        user.id = ++id;
        usuarios.push(user);
        res.send({ mesage: 'Usuário criado com sucesso!' });
    }

    static update(req: Request, res: Response) {
        let id = Number(req.params.id);
        let user = req.body;

        let index = usuarios.findIndex(u => u.id === id);

        usuarios[index].nome = user.nome;
        usuarios[index].email = user.email;

        res.send('Usuário atualizado com sucesso!');
    }

    static delete(req: Request, res: Response) {
        let id = Number(req.params.id);
        let index = usuarios.findIndex(u => u.id === id);
        usuarios.splice(index, 1);
        res.send('Usuário removido com sucesso!');
    }
}