import { NotFoundError } from "../errors/not-found.error";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {

    private _repository: CompanyRepository;

    constructor() {
        this._repository = new CompanyRepository();
    }

    async getAll(): Promise<Company[]> {
        return await this._repository.getAll();
    }

    async getById(id: string): Promise<Company | null> {
        const company = await this._repository.getById(id);

        if (!company)
            throw new NotFoundError('Empresa não encontrada');

        return company;
    }

    async save(company: Company) {
        await this._repository.update(company);
    }

    async update(id: string, company: Company) {
        const _company = await this._repository.getById(id);

        if (!_company)
            throw new NotFoundError("Empresa não encontrada");

        _company.logomarca = company.logomarca;
        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativa = company.ativa;

        await this._repository.update(_company);
    }
}