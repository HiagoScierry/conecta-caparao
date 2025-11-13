import { LocalUpload } from "./LocalUpload";
import { S3Upload } from "./S3Upload";
import { IUpload } from "./IUpload";

// Determina qual uploader usar baseado na variável de ambiente
const createUploader = (): IUpload => {
  const uploadType = process.env.UPLOAD_TYPE || "local";
  
  switch (uploadType.toLowerCase()) {
    case "s3":
      return new S3Upload();
    case "local":
    default:
      return new LocalUpload();
  }
};

const uploader = createUploader();

export const uploadDir = async (file: Buffer | null, fileName: string): Promise<string> => {
  return uploader.uploadFile(file, fileName);
};

export const getFileUrl = (fileName: string): string => {
  return uploader.getFileUrl(fileName);
};

// Exporta as classes para uso direto se necessário
export { LocalUpload, S3Upload };
export type { IUpload };
