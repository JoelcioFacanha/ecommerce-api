import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationErro } from "../errors/validation.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class CategoryService {

    private _repository: CategoryRepository;
    private _productRepository: ProductRepository;

    constructor() {
        this._repository = new CategoryRepository();
        this._productRepository = new ProductRepository();
    }

    async getAll(): Promise<Category[]> {
        return await this._repository.getAll();
    }

    async getById(id: string): Promise<Category> {
        const _category = await this._repository.getById(id);

        if (!_category)
            throw new NotFoundError('Categoria não encontrada');

        return _category;
    }

    async save(category: Category) {
        await this._repository.save(category);
    }

    async update(id: string, category: Category) {
        const _category = await this.getById(id);

        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this._repository.update(_category);
    }

    async delete(id: string) {
        if (await this._productRepository.getCountByCategory(id) > 0)
            throw new ValidationErro("Não é possível excluir uma categoria com produtos relacionados");

        await this._repository.delete(id);
    }
}