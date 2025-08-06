import { parseForm, uploadDir } from "@/lib/upload/upload";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { fields, files } = await parseForm(req);

    // Exemplo para pegar os arquivos chamados "photos"
    let uploadedFiles = [];

    if (Array.isArray(files.photos)) {
      uploadedFiles = files.photos.map(
        (file) => `/uploads/${path.basename(file.filepath)}`
      );
    } else if (files.photos) {
      uploadedFiles = [`/uploads/${path.basename(files.photos.filepath)}`];
    }

    return res.status(200).json({ files: uploadedFiles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no upload" });
  }
}
