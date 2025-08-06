import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { IUpload } from "./IUpload";

export class S3Upload implements IUpload {
  private bucketName: string;
  private region: string;
  private client: S3Client;

  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME!;
    this.region = process.env.AWS_REGION!;
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile(file: Buffer | null, fileName: string): Promise<string> {
    if (!file) {
      throw new Error("Arquivo não pode ser nulo.");
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file,
      ContentType: this.getMimeType(fileName),
    });

    await this.client.send(command);

    return this.getFileUrl(fileName);
  }

  getFileUrl(fileName: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split(".").pop();
    const map: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
    };
    return map[ext ?? ""] || "application/octet-stream";
  }
}
