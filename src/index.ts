import express, { Request, Response } from 'express';

var app = express();

app.get('/', (req, res) => {
    res.send('Bem vindo ao curso de nodejs - tsc-watch');
});

app.get('/users', (req: Request, res: Response) => {
    let usuarios = [
        { nome: "Maria dos Santos", idade: 25 },
        { nome: "João Medeiros", idade: 30 },
        { nome: "Claudia Maia", idade: 45 },
        { nome: "João Carlos Silva", idade: 18 },
    ];
    res.send(usuarios);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
