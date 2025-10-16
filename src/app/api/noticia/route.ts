import { createNoticia, getAllNoticias } from "@/controllers/noticiaController";
import { noticiaSchema } from "@/schemas/noticiaSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const noticias = await getAllNoticias();
  return NextResponse.json(noticias);
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    console.log("Received data:", requestData);

    // Validar se os dados necessários estão presentes
    if (!requestData.noticia) {
      return NextResponse.json({ message: "Dados da notícia não fornecidos!" }, { status: 400 });
    }

    const { noticia, fotosUrl } = requestData;

    noticiaSchema.parse(noticia);

    await createNoticia({
      noticia: {
        ...noticia,
        data: new Date(noticia.data).toISOString().split('T')[0] // Manter como string no formato YYYY-MM-DD
      },
      fotosUrl
    });

    return NextResponse.json({ message: "Notícia criada com sucesso!" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Criação da notícia falhou!", error }, { status: 500 });
  }
}