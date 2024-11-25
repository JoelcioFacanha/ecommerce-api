import { ErrorBase } from "./base.error.js";

export class InternalServerError extends ErrorBase {
    constructor(message = "Error Interno do servidor") {
        super(500, message);
    }
}