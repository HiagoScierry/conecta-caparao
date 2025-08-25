import { LocalUpload } from "./LocalUpload";

const uploader = new LocalUpload();

export const uploadDir = async (file: Buffer | null, fileName: string): Promise<string> => {
  return uploader.uploadFile(file, fileName);
};

export const getFileUrl = (fileName: string): string => {
  return uploader.getFileUrl(fileName);
};
