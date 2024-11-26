import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { isValidUrl } from "../utils/validation.utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductService {

    private _repository: ProductRepository;
    private _categoryRepository: CategoryRepository
    private _uploadFileService: UploadFileService;

    constructor() {
        this._repository = new ProductRepository();
        this._categoryRepository = new CategoryRepository();
        this._uploadFileService = new UploadFileService(); //("images/products/");
    }

    async getAll(): Promise<Product[]> {
        return await this._repository.getAll();
    }

    async search(categoryId: string): Promise<Product[]> {
        await this.getCategoryById(categoryId);
        return await this._repository.search(categoryId);
    }

    async getById(id: string): Promise<Product> {
        const _product = await this._repository.getById(id);

        if (!_product)
            throw new NotFoundError('Produto não encontrado');

        return _product;
    }

    async save(product: Product) {
        const _category = await this.getCategoryById(product.categoria.id!);
        product.categoria = _category;

        if (product.imagem)
            product.imagem = await this._uploadFileService.uploadTeste(product.imagem);

        await this._repository.save(product);
    }

    async update(id: string, product: Product) {
        const _product = await this.getById(id);
        const _category = await this.getCategoryById(product.categoria.id!);

        if (product.imagem && !isValidUrl(product.imagem))
            _product.imagem = await this._uploadFileService.uploadTeste(product.imagem);

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.preco = product.preco;
        _product.categoria = _category;
        _product.ativa = product.ativa;

        await this._repository.update(_product);
    }

    async delete(id: string) {
        await this._repository.delete(id);
    }

    private async getCategoryById(id: string) {
        const _category = await this._categoryRepository.getById(id);

        if (!_category)
            throw new NotFoundError("Categoria não encontrada");

        return _category;
    }
}