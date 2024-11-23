import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { Company } from "../models/company.model";

export class CompanyController {
    static async getAll(req: Request, res: Response) {
        res.send(await new CompanyService().getAll());
    }

    static async getUserById(req: Request, res: Response) {
        let userId = req.params.id;
        res.send(await new CompanyService().getById(userId));
    }

    static async save(req: Request, res: Response) {
        await new CompanyService().save(req.body)
        res.status(201).send({ message: 'Empresa criada com sucesso!' });

    }

    static async update(req: Request, res: Response) {
        console.log(req.params.id);
        await new CompanyService().update(req.params.id, req.body as Company)
        res.send({ message: 'Empresa alterada com sucesso' });
    }
}