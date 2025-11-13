import { IUpload } from "./IUpload";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Upload implements IUpload {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly baseUrl?: string;

  constructor() {
    // Configurações do AWS S3
    this.region = process.env.AWS_REGION || "us-east-1";
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
    this.baseUrl = process.env.AWS_S3_BASE_URL; // URL personalizada se estiver usando CloudFront ou similar

    if (!this.bucketName) {
      throw new Error("AWS_S3_BUCKET_NAME environment variable is required");
    }

    // Configuração do cliente S3
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  async uploadFile(file: Buffer | null, fileName: string): Promise<string> {
    if (!file) {
      throw new Error("No file provided");
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
        ContentType: this.getContentType(fileName),
        // Define permissões de leitura pública para o arquivo
        ACL: "public-read",
      });

      await this.s3Client.send(command);
      console.log(`Arquivo enviado com sucesso para S3: ${fileName}`);

      return this.getFileUrl(fileName);
    } catch (error) {
      console.error(`Erro ao enviar arquivo para S3: ${error}`);
      throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getFileUrl(fileName: string): string {
    // Se uma URL base personalizada foi configurada (ex: CloudFront)
    if (this.baseUrl) {
      return `${this.baseUrl}/${fileName}`;
    }

    // URL padrão do S3
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
  }

  /**
   * Gera uma URL assinada para acesso temporário ao arquivo (opcional)
   * Útil se você quiser controlar o acesso aos arquivos
   */
  async getSignedUrl(fileName: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn, // Expira em segundos (padrão: 1 hora)
      });

      return signedUrl;
    } catch (error) {
      console.error(`Erro ao gerar URL assinada: ${error}`);
      throw new Error(`Failed to generate signed URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Determina o Content-Type baseado na extensão do arquivo
   */
  private getContentType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const mimeTypes: { [key: string]: string } = {
      // Imagens
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      
      // Documentos
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      
      // Texto
      'txt': 'text/plain',
      'csv': 'text/csv',
      
      // Vídeo
      'mp4': 'video/mp4',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',
      
      // Áudio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  }
}