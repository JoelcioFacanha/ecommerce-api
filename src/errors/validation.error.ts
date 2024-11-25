import { ErrorBase } from "./base.error.js";

export class ValidationErro extends ErrorBase {
    constructor(message: string) {
        super(400, message);
    }
}