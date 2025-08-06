import { NextRequest, NextResponse } from 'next/server';
import {
  getMunicipioById,
  deleteMunicipio,
  updateMunicipio,
} from '@/controllers/municipioController';
import { municipioSchema } from '@/schemas/municipioSchema';
import { contatoSchema } from '@/schemas/contatoSchema';

// Utilitário para extrair o ID da URL
function extractIdFromUrl(req: NextRequest): string | null {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  return parts.at(-1) || null;
}

// GET /api/municipio/[id]
export async function GET(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'ID not found in URL' },
        { status: 400 }
      );
    }

    const response = await getMunicipioById(id);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching municipio:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch municipio' },
      { status: 500 }
    );
  }
}

// PUT /api/municipio/[id]
export async function PUT(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'ID not found in URL' },
        { status: 400 }
      );
    }

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

    const updatedMunicipio = await updateMunicipio(data);

    return NextResponse.json({
      status: 'success',
      data: updatedMunicipio,
    });
  } catch (error) {
    console.error('Error updating municipio:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to update municipio' },
      { status: 500 }
    );
  }
}

// DELETE /api/municipio/[id]
export async function DELETE(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'ID not found in URL' },
        { status: 400 }
      );
    }

    await deleteMunicipio(id);

    return NextResponse.json({
      status: 'success',
      message: 'Municipio deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting municipio:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to delete municipio' },
      { status: 500 }
    );
  }
}
