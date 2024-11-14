import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {

    private _repository: UserRepository;
    private _authService: AuthService;

    constructor() {
        this._repository = new UserRepository();
        this._authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
        return await this._repository.getAll();
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this._repository.getById(id);

        if (!user)
            throw new NotFoundError('Usuário não encontrado');

        return user;
    }

    async save(user: User) {
        const userAuth = await this._authService.create(user);
        user.id = userAuth.uid;
        await this._repository.update(user);
    }

    async update(id: string, user: User) {
        const _user = await this._repository.getById(id);

        if (!_user)
            throw new NotFoundError("Usuário não encontrado");

        _user.nome = user.nome;
        _user.email = user.email;

        await this._repository.update(_user);
    }

    async delete(id: string) {
        await this._repository.delete(id);
    }
}