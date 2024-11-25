import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.model.js";

export class CompanyRepository {

    private _collection: CollectionReference;

    constructor() {
        this._collection = getFirestore().collection('companies');
    }

    async getAll() {
        const snapshot = await this._collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Company[];
    }

    async getById(id: string): Promise<Company | null> {
        let doc = await this._collection.doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as Company;
        } else {
            return null;
        }
    }

    async update(company: Company) {
        let docRef = await this._collection.doc(company.id!);
        delete company.id
        await docRef.set(company);
    }

    async save(company: Company) {
        await this._collection.add(company);
    }

    async delete(id: string) {
        await this._collection.doc(id).delete();
    }
}