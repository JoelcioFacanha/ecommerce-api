import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.send(await new UserService().getUserById(userId));
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        await new UserService().save(req.body as User)
        res.status(201).send({ message: 'Usuário criado com sucesso!' });

    }

    static async update(req: Request, res: Response, next: NextFunction) {
        await new UserService().update(req.params.id, req.body as User)
        res.send({ message: 'Usuário alterado com sucesso' });
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        res.status(204).send(await new UserService().delete(req.params.id)).end();
    }
}