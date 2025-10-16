import { createEvento, getAllEventos } from "@/controllers/eventoController";
import { eventoSchema } from "@/schemas/eventoSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const eventos = await getAllEventos();
  return NextResponse.json(eventos);
}

export async function POST(request: NextRequest) {
  try {
    const { evento, municipio, endereco, fotosUrl } = await request.json();

    eventoSchema.parse(evento);

    await createEvento({
      evento: {
        ...evento,
        data: evento.data // Mantém como string, o controller fará a conversão se necessário
      }, 
      municipio, 
      endereco
    }, fotosUrl);

    return NextResponse.json({ message: "Evento created successfully!" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Evento creation failed!", error }, { status: 500 });
  }


}