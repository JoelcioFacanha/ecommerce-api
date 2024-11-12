import { ErrorBase } from "./base.error";

export class ValidationErro extends ErrorBase {
    constructor(message: string) {
        super(400, message);
    }
}