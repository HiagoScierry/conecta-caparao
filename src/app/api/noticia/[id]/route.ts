import { deleteNoticia, getNoticiaById, updateNoticia } from "@/controllers/noticiaController";
import { noticiaSchema } from "@/schemas/noticiaSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const noticia = await getNoticiaById(Number(id));
    if (!noticia) {
      return new NextResponse("Notícia not found", { status: 404 });
    }

    return NextResponse.json(noticia, { status: 200 });
  } catch (error) {
    console.error("GET notícia error:", error);
    return new NextResponse("Evento not found", { status: 404 });
  }
}


export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const requestData = await request.json();
    console.log("Received update data:", requestData);

    // Validar se os dados necessários estão presentes
    if (!requestData.noticia) {
      return NextResponse.json({ message: "Dados da notícia não fornecidos!" }, { status: 400 });
    }

    const { noticia, fotosUrl } = requestData;

    noticiaSchema.parse(noticia);

    await updateNoticia(Number(id), {
      noticia: {
        ...noticia,
        data: new Date(noticia.data).toISOString().split('T')[0] // Manter como string no formato YYYY-MM-DD
      },
      fotosUrl
    });

    return NextResponse.json({ message: "Notícia atualizada com sucesso!" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Atualização da notícia falhou!", error }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteNoticia(Number(id));

    return NextResponse.json({ message: "Notícia deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Evento deletion failed!", error }, { status: 500 });
  }
}