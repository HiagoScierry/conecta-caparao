import fs from "fs";
import path from "path";
import { IUpload } from "./IUpload";

export class LocalUpload implements IUpload {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public/uploads");

    // Garante que o diretório exista
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Buffer | null, fileName: string): Promise<string> {
    if (!file) {
      throw new Error("Arquivo não pode ser nulo.");
    }

    const filePath = path.join(this.uploadDir, fileName);
    await fs.promises.writeFile(filePath, file);
    return this.getFileUrl(fileName);
  }

  getFileUrl(fileName: string): string {
    return `/uploads/${fileName}`; // relativo ao domínio
  }
}
