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

    const {noticia, fotosUrl} = await request.json();

    noticiaSchema.parse(noticia);

    await updateNoticia(Number(id), noticia, fotosUrl);

    return NextResponse.json({ message: "Evento updated successfully!" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Evento update failed!", error }, { status: 500 });
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