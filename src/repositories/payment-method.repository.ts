import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment.model.js";

export class PaymentMethodRepository {

    private _collection: CollectionReference;

    constructor() {
        this._collection = getFirestore().collection('payments-mehtods');
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this._collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as PaymentMethod[];
    }

    async getById(id: string): Promise<PaymentMethod | null> {
        let doc = await this._collection.doc(id).get();

        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as PaymentMethod;
        } else {
            return null;
        }
    }

    async update(paymentMethod: PaymentMethod) {
        let docRef = await this._collection.doc(paymentMethod.id!);
        delete paymentMethod.id
        await docRef.set(paymentMethod);
    }

    async save(paymentMethod: PaymentMethod) {
        await this._collection.add(paymentMethod);
    }

    async delete(id: string) {
        await this._collection.doc(id).delete();
    }
}