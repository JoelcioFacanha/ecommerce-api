import express, { NextFunction, Request, Response } from 'express';
import { ValidationErro } from '../errors/validation.error';
import { InternalServerError } from '../errors/internal-server.error';
import { NotFoundError } from '../errors/not-found.error';
import { errors } from 'celebrate';

export const errorHandler = (app: express.Express) => {
    app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationErro) {
            error.send(res);
        } else if (error instanceof NotFoundError) {
            error.send(res);
        }
        else {
            new InternalServerError().send(res);
        }
    });
}