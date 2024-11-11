import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { routes } from './routes/index';

initializeApp();
var app = express();

routes(app);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
