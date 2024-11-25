import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {

    private _repository: ProductRepository;
    private _categoryRepository: CategoryRepository

    constructor() {
        this._repository = new ProductRepository();
        this._categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Product[]> {
        return await this._repository.getAll();
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

        await this._repository.save(product);
    }

    async update(id: string, product: Product) {
        const _product = await this.getById(id);
        const _category = await this.getCategoryById(product.categoria.id!);

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.preco = product.preco;
        _product.imagem = product.imagem;
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