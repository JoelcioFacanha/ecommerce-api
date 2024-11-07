import express, { Request, Response } from 'express';

var app = express();
app.use(express.json());

let id = 0;
let usuarios: { id: number, nome: string, email: string }[] = [];

app.get('/', (req, res) => {
    res.send('Bem vindo ao curso de nodejs - tsc-watch');
});

app.get('/users', (req: Request, res: Response) => {
    res.send(usuarios);
});

app.get('/users/:id', (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = usuarios.find(u => u.id === userId);
    res.send(user);
});

app.post('/users', (req: Request, res: Response) => {
    let user = req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({ mesage: 'Usuário criado com sucesso!' });
});

app.delete('/users/:id', (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let index = usuarios.findIndex(u => u.id === id);
    usuarios.splice(index, 1);
    res.send('Usuário removido com sucesso!');
});

app.put('/users/:id', (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let user = req.body;

    let index = usuarios.findIndex(p => p.id === id);

    usuarios[index].nome = user.nome;
    usuarios[index].email = user.email;

    res.send('Usuário atualizado com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
