// get all municipios
import { NextResponse, NextRequest } from 'next/server';
import { createMunicipio, getAllMunicipios } from '@/controllers/municipioController';
import { municipioSchema } from '@/schemas/municipioSchema';
import { contatoSchema } from '@/schemas/contatoSchema';


export async function GET() {
  const response = await getAllMunicipios();
  return NextResponse.json(response);
}

// POST /api/municipio
export async function POST(req: NextRequest) {
  try {
    console.log('Received POST request to /api/municipio');
    console.log('Request body:', req.headers); // Log the raw request body for debugging

    const data = await req.json();

    const { error: errorMunicipio } = municipioSchema['~validate'](data.municipio);
    const { error: errorContato } = contatoSchema['~validate'](data.contato);

    if (errorMunicipio || errorContato) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: {
            municipio: errorMunicipio,
            contato: errorContato,
          },
        },
        { status: 400 }
      );
    }

    const newMunicipio = await createMunicipio(data.municipio, data.contato, data.fotos || []);

    return NextResponse.json({
      status: 'success',
      data: newMunicipio,
    });
  } catch (error) {
    console.error('Error creating municipio:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to create municipio' },
      { status: 500 }
    );
  }
}
