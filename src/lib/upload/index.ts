import { S3Upload } from "./S3Upload";
import { LocalUpload } from "./LocalUpload";

const useS3 = process.env.USE_S3 === "true";

const uploader = useS3 ? new S3Upload() : new LocalUpload();

export const uploadDir = async (file: Buffer | null, fileName: string): Promise<string> => {
  return uploader.uploadFile(file, fileName);
};

export const getFileUrl = (fileName: string): string => {
  return uploader.getFileUrl(fileName);
};