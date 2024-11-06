import express from 'express';

var app = express();

app.get('/', (req, res) => {
    res.send('Bem vindo ao curso de nodejs - tsc-watch');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
