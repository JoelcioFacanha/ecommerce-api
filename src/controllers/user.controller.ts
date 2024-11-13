import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.send(new UserService().getUserById(userId));
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        res.status(201).send(await new UserService().save(req.body as User));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        res.send(new UserService().update(req.params.id, req.body as User));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        res.status(204).send(await new UserService().delete(req.params.id)).end();
    }
}