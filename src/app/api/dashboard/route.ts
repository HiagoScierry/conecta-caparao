import { connection } from "@/config/database/connection";
import { NextResponse } from "next/server";

export async function GET() {
  const count = {
    municipios: await connection.municipio.count(),
    atracoes: await connection.atracaoTuristica.count(),
    eventos: await connection.evento.count(),
    noticias: await connection.noticia.count(),
    servicos: await connection.servicoTuristico.count()
  }



  return NextResponse.json(count);
}