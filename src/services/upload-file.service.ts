import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fileTypeFromBuffer } from "file-type";
import { randomUUID } from "node:crypto";
import { ValidationErro } from "../errors/validation.error.js";

export class UploadFileService {
    constructor(private _path: string = "") { }

    async upload(base64: string): Promise<string> {
        const _fileBuffer = Buffer.from(base64, "base64");
        const _fileType = await fileTypeFromBuffer(_fileBuffer);

        if (!_fileType)
            throw new ValidationErro("A eExtensão do arquivo não é inválida!");

        if (_fileType.mime !== "image/jpeg" && _fileType.mime !== "image/png")
            throw new ValidationErro("A imagem precisa ser JPEG ou PNG");

        const _fileName = `${randomUUID().toString()}.${_fileType?.ext}`;

        fs.writeFileSync(_fileName, _fileBuffer);

        const _bucket = getStorage().bucket("");
        const _uploadResponse = await _bucket.upload(_fileName, {
            destination: this._path + _fileName
        });

        fs.unlinkSync(_fileName);

        return getDownloadURL(_uploadResponse[0]);
    }

    async uploadTeste(base64: string): Promise<string> {
        const _fileBuffer = Buffer.from(base64, "base64");
        const _fileType = await fileTypeFromBuffer(_fileBuffer);

        if (!_fileType)
            throw new ValidationErro("A eExtensão do arquivo não é inválida!");

        if (_fileType.mime !== "image/jpeg" && _fileType.mime !== "image/png")
            throw new ValidationErro("A imagem precisa ser JPEG ou PNG");

        const _fileName = `${randomUUID().toString()}.${_fileType?.ext}`;

        fs.writeFileSync(_fileName, _fileBuffer);
        fs.unlinkSync(_fileName);

        return `https://firesotre.googleapis.com/v0/${_fileName}`;
    }
}