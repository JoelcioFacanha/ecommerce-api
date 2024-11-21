import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthContoller {
    static async login(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;

        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true);
        res.send({ token: token });
    }
}