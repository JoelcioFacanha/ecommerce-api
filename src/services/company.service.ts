import { NotFoundError } from "../errors/not-found.error.js";
import { Company } from "../models/company.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { isValidUrl } from "../utils/validation.utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class CompanyService {

    private _repository: CompanyRepository;
    private _uploadService: UploadFileService

    constructor() {
        this._repository = new CompanyRepository();
        this._uploadService = new UploadFileService(); //("images/companies/");
    }

    async getAll(): Promise<Company[]> {
        return await this._repository.getAll();
    }

    async getById(id: string): Promise<Company> {
        const company = await this._repository.getById(id);

        if (!company)
            throw new NotFoundError('Empresa não encontrada');

        return company;
    }

    async save(company: Company) {
        const _logomarcaUrl = await this._uploadService.uploadTeste(company.logomarca);
        company.logomarca = _logomarcaUrl;
        await this._repository.save(company);
    }

    async update(id: string, company: Company) {
        const _company = await this.getById(id);

        if (!isValidUrl(company.logomarca))
            _company.logomarca = await this._uploadService.uploadTeste(company.logomarca);

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