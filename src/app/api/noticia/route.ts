import { createNoticia, getAllNoticias } from "@/controllers/noticiaController";
import { noticiaSchema } from "@/schemas/noticiaSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const noticias = await getAllNoticias();
  return NextResponse.json(noticias);
}

export async function POST(request: NextRequest) {
  try {
    const { noticia, fotosUrl } = await request.json();

    noticiaSchema.parse(noticia);

    await createNoticia({
      ...noticia,
      data: new Date(noticia.data)
    }, fotosUrl);

    return NextResponse.json({ message: "Notícia criada com sucesso!" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Criação da notícia falhou!", error }, { status: 500 });
  }


}