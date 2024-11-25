import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.model.js";

export class CategoryRepository {

    private _collection: CollectionReference;

    constructor() {
        this._collection = getFirestore().collection('categories');
    }

    async getAll() {
        const snapshot = await this._collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Category[];
    }

    async getById(id: string): Promise<Category | null> {
        let doc = await this._collection.doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as Category;
        } else {
            return null;
        }
    }

    async update(category: Category) {
        let docRef = await this._collection.doc(category.id!);
        delete category.id
        await docRef.set(category);
    }

    async save(category: Category) {
        await this._collection.add(category);
    }

    async delete(id: string) {
        await this._collection.doc(id).delete();
    }
}