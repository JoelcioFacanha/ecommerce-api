import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment.model.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";

export class PaymentMethodService {

    private _repository: PaymentMethodRepository;

    constructor() {
        this._repository = new PaymentMethodRepository();
    }

    async getAll(): Promise<PaymentMethod[]> {
        return await this._repository.getAll();
    }

    async getById(id: string): Promise<PaymentMethod> {
        const _paymentMethod = await this._repository.getById(id);

        if (!_paymentMethod)
            throw new NotFoundError('Forma de pagamento não encontrada');

        return _paymentMethod;
    }

    async save(paymentMethod: PaymentMethod) {
        await this._repository.save(paymentMethod);
    }

    async update(id: string, paymentMethod: PaymentMethod) {
        const _paymentMethod = await this.getById(id);

        _paymentMethod.descricao = paymentMethod.descricao;
        _paymentMethod.ativa = paymentMethod.ativa;

        await this._repository.update(_paymentMethod);
    }

    async delete(id: string) {
        await this._repository.delete(id);
    }
}