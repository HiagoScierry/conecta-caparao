import { deleteEvento, getByIdEvento, updateEvento } from "@/controllers/eventoController";
import { eventoSchema } from "@/schemas/eventoSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const evento = await getByIdEvento(id);
    if (!evento) {
      return new NextResponse("Evento not found", { status: 404 });
    }

    return NextResponse.json(evento, { status: 200 });
  } catch (error) {
    console.error("GET evento error:", error);
    return new NextResponse("Evento not found", { status: 404 });
  }
}


export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { evento, municipio, endereco, fotosUrl } = await request.json();

      eventoSchema.parse(evento);

    await updateEvento(id, {
      evento: {
        ...evento,
        data: new Date(evento.data)
      }, municipio, endereco
    }, fotosUrl);

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

    await deleteEvento(id);

    return NextResponse.json({ message: "Evento deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Evento deletion failed!", error }, { status: 500 });
  }
}