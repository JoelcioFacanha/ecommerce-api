import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        res.send(await new ProductService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const _id = req.params.id;
        res.send(await new ProductService().getById(_id));
    }

    static async save(req: Request, res: Response) {
        await new ProductService().save(req.body as Product)
        res.status(201).send({ message: 'Produto criado com sucesso!' });
    }

    static async update(req: Request, res: Response) {
        await new ProductService().update(req.params.id, req.body as Product)
        res.send({ message: 'Produto alterado com sucesso' });
    }

    static async delete(req: Request, res: Response) {
        res.status(204).send(await new ProductService().delete(req.params.id)).end();
    }
}