import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductRepository {

    private _collection: CollectionReference;

    constructor() {
        this._collection = getFirestore().collection('products');
    }

    async getAll() {
        const _snapshot = await this._collection.get();
        return this.snapshotToArray(_snapshot);
    }

    async search(categoryId: string): Promise<Product[]> {
        const _snapshot = await this._collection.where("categoria.id", "==", categoryId).get();
        return this.snapshotToArray(_snapshot);
    }

    private snapshotToArray(snapshot: QuerySnapshot): Product[] {
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Product[];
    }

    async getById(id: string): Promise<Product | null> {
        let doc = await this._collection.doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as Product;
        } else {
            return null;
        }
    }

    async update(product: Product) {
        let docRef = await this._collection.doc(product.id!);
        delete product.id
        await docRef.set(product);
    }

    async save(product: Product) {
        await this._collection.add(product);
    }

    async delete(id: string) {
        await this._collection.doc(id).delete();
    }

    async getCountByCategory(categoryId: string): Promise<number> {
        const _snapshot = await this._collection.where("categoria.id", "==", categoryId).count().get();
        return _snapshot.data().count;
    }
}