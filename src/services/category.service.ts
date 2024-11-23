import { NotFoundError } from "../errors/not-found.error";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {

    private _repository: CategoryRepository;

    constructor() {
        this._repository = new CategoryRepository();
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
        await this._repository.delete(id);
    }
}