import { Request, Response } from "express";
import { PaymentMethodService } from "../services/payment-method.service.js";
import { PaymentMethod } from "../models/payment.model.js";

export class PaymentMethodController {
    static async getAll(req: Request, res: Response) {
        res.send(await new PaymentMethodService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const _paymentMethodId = req.params.id;
        res.send(await new PaymentMethodService().getById(_paymentMethodId));
    }

    static async save(req: Request, res: Response) {
        await new PaymentMethodService().save(req.body);
        res.status(201).send({
            message: "Forma de pagamento criada com sucesso"
        });
    }

    static async update(req: Request, res: Response) {
        const _paymentMethodId = req.params.id;
        const _paymentMethod = req.body as PaymentMethod;

        await new PaymentMethodService().update(_paymentMethodId, _paymentMethod);
        res.send({ message: "Forma de pagamento atualizada com sucesso" });
    }

    static async delete(req: Request, res: Response) {
        await new PaymentMethodService().delete(req.params.id);
        res.status(204).end();
    }
}