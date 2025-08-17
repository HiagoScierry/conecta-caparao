import { IUpload } from "./IUpload";
import fs from "fs";
import path from "path";

export class LocalUpload implements IUpload {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public/uploads");
  }

  async uploadFile(file: Buffer | null, fileName: string): Promise<string> {
    if (!file) {
      throw new Error("No file provided");
    }

    // Garante que o diretório de upload exista
    fs.mkdirSync(this.uploadDir, { recursive: true });

    const filePath = path.join(this.uploadDir, fileName);

    await fs.promises.writeFile(filePath, file);

    return this.getFileUrl(fileName);
  }

  getFileUrl(fileName: string): string {
    // Caminho público acessível via navegador
    return `/uploads/${fileName}`;
  }
}
