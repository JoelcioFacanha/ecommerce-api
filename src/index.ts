import express, { Request, Response } from 'express';

var app = express();
app.use(express.json());

let usuarios = [
    { nome: "Maria dos Santos", idade: 25 },
    { nome: "João Medeiros", idade: 30 },
    { nome: "Claudia Maia", idade: 45 },
    { nome: "João Carlos Silva", idade: 18 },
];

app.get('/', (req, res) => {
    res.send('Bem vindo ao curso de nodejs - tsc-watch');
});

app.get('/users', (req: Request, res: Response) => {
    res.send(usuarios);
});

app.post('/users', (req: Request, res: Response) => {
    let user = req.body;
    usuarios.push(user);
    res.send({ mesage: 'Usuário criado com sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
