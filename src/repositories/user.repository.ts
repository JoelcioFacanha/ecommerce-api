import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

export class UserRepository {

    private _collection: CollectionReference;

    constructor() {
        this._collection = getFirestore().collection('users');
    }

    async getAll() {
        const snapshot = await this._collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    }

    async getById(id: string): Promise<User | null> {
        let doc = await this._collection.doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as User;
        } else {
            return null;
        }
    }

    async update(user: User) {
        let docRef = await this._collection.doc(user.id);

        await docRef.set({
            nome: user.nome,
            email: user.email
        });
    }

    async save(user: User) {
        await this._collection.add(user);
    }

    async delete(id: string) {
        await this._collection.doc(id).delete();
    }
}