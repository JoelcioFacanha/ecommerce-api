import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {

    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection('users').get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    }

    async getUserById(id: string): Promise<User> {
        let doc = await getFirestore().collection('users').doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as User;
        } else {
            throw new NotFoundError('Usuário não encontrado');
        }
    }

    async save(user: User): Promise<string> {
        const usuarioSalvo = await getFirestore().collection("users").add(user)
        return `Usuário ${usuarioSalvo.id} criado com sucesso!`;
    }

    async update(userId: string, user: User): Promise<string> {

        let docRef = await getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {

            await docRef.set({
                nome: user.nome,
                email: user.email
            });

            return 'Usuário atualizado com sucesso!';
        } else {
            throw new NotFoundError("Usuário não encontrado");
        }
    }

    async delete(userId: string) {
        await getFirestore().collection('users').doc(userId).delete();
    }
}