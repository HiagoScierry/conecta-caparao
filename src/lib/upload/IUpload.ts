export interface IUpload {
  uploadFile(file: Buffer<ArrayBufferLike> | null, fileName: string): Promise<string>;
  getFileUrl(fileName: string): string;
}