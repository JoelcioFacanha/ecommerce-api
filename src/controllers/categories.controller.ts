import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category.model";

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.send(await new CategoryService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const _id = req.params.id;
        res.send(await new CategoryService().getById(_id));
    }

    static async save(req: Request, res: Response) {
        await new CategoryService().save(req.body as Category)
        res.status(201).send({ message: 'Categoria criada com sucesso!' });
    }

    static async update(req: Request, res: Response) {
        await new CategoryService().update(req.params.id, req.body as Category)
        res.send({ message: 'Categoria alterada com sucesso' });
    }

    static async delete(req: Request, res: Response) {
        res.status(204).send(await new CategoryService().delete(req.params.id)).end();
    }
}