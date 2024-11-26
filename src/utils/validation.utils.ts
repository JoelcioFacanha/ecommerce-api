import { ValidationErro } from "../errors/validation.error.js";

export const isValidUrl = (url: string): boolean => {
    try {
        const _url = new URL(url);
        console.log(_url);
        if (_url.host !== "firesotre.googleapis.com")
            throw new ValidationErro("URL de origem inválida!");

        console.log(_url);
        return true;
    } catch (error) {
        if (error instanceof ValidationErro)
            throw error;

        return false;
    }
}