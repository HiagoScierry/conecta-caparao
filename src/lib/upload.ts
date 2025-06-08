import formidable from "formidable";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const fotoUpload = async (req) => {
  return {
    local: await parseFormSaveLocal(req),
    s3: async () =>{
      const { files } = await parseFormS3(req);
      return await uploadFilesToS3(files);
    }
  }
}



export const uploadDir = path.join(process.cwd(), "/public/uploads");

// Função para processar uploads (aceita múltiplos arquivos)
export function parseFormSaveLocal(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      multiples: true, // habilita múltiplos arquivos
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      // Pode adaptar aqui para extrair os arquivos enviados
      resolve({ fields, files });
    });
  });
}

export function parseFormS3(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
      // Não setar uploadDir, pois não vamos salvar localmente
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function uploadFilesToS3(files) {
  // files pode ser array ou objeto (se 1 arquivo)
  const fileArray = Array.isArray(files) ? files : [files];
  const uploadedFiles = [];

  for (const file of fileArray) {
    const fileStream = fs.createReadStream(file.filepath);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalFilename}`, // Nome do arquivo no bucket
      Body: fileStream,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));

    // Url pública padrão do arquivo no bucket (depende da configuração do bucket)
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    uploadedFiles.push(fileUrl);
  }

  return uploadedFiles;
}

