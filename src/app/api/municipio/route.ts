// get all municipios
import { NextResponse, NextRequest } from 'next/server';
import { createMunicipio, getAllMunicipios } from '@/controllers/municipioController';
import { municipioForm } from '@/forms/municipioForm';
import { contatoSchema } from '@/schemas/contatoSchema';
import { uploadDir } from '@/lib/upload';

export async function GET() {
  const response = await getAllMunicipios();
  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const municipioData = formData.get('municipio')?.toString() || '{}';
  const contatoData = formData.get('contato')?.toString() || '{}';
  const files = formData.getAll('files');

  console.log('Files received:', files);
  console.log('Municipio Data:', municipioData);
  console.log('Contato Data:', contatoData);


  // const response = await createMunicipio(municipio, contato, );
  return NextResponse.json(
    { status: 'error', message: 'Not implemented yet' }
  );
}