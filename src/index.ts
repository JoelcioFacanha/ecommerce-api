import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { routes } from './routes/index';
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFoundHandler } from './middlewares/page-not-found.middleware';

initializeApp();
var app = express();

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
