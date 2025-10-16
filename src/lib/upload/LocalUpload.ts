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

    try {
      // Garante que o diretório de upload exista
      if (!fs.existsSync(this.uploadDir)) {
        fs.mkdirSync(this.uploadDir, { recursive: true });
        console.log(`Diretório de upload criado: ${this.uploadDir}`);
      }

      const filePath = path.join(this.uploadDir, fileName);

      await fs.promises.writeFile(filePath, file);
      console.log(`Arquivo salvo com sucesso: ${filePath}`);

      return this.getFileUrl(fileName);
    } catch (error) {
      console.error(`Erro ao salvar arquivo: ${error}`);
      throw new Error(`Failed to save file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getFileUrl(fileName: string): string {
    // Caminho para a rota API que serve os arquivos de upload
    return `/uploads/${fileName}`;
  }
}