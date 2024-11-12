import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationErro } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

type User = {
    id: number;
    nome: string;
    email: string;
};

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        res.send(users);
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;

        let doc = await getFirestore().collection('users').doc(userId).get();

        if (doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } else {
            throw new NotFoundError('Usuário não encontrado');
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {

        let user = req.body;

        if (!user.email || user.email?.length === 0)
            throw new ValidationErro("E-mail obrigatório!");

        const usuarioSalvo = await getFirestore().collection("users").add(user)

        res.status(201).send({ mesage: `Usuário ${usuarioSalvo.id} criado com sucesso!` });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body as User;
        let docRef = await getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {

            await docRef.set({
                nome: user.nome,
                email: user.email
            });

            res.send({ message: 'Usuário atualizado com sucesso!' });
        } else {
            throw new NotFoundError("Usuário não encontrado");
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection('users').doc(userId).delete();
        res.status(204).end();
    }
}