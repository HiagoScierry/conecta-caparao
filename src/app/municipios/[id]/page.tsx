'use client';
import { use } from 'react';
import { LayoutPublic } from '@/components/public/Layout';
import { Hero } from '@/components/public/Hero';
import { GaleriaDeImagens } from '@/components/public/GaleriaDeImagens';
import { AttractionsGallery } from '@/components/public/AttractionsGallery';
import { Informacoes } from '@/components/public/Informacoes';
import { useGetMunicipioById } from '@/hooks/http/useMunicipio';
import { Progress } from '@/components/ui/progress';
import { DescriptionSection } from '@/components/public/DescriptionSection';

type Props = {
  params: Promise<{ id: string }>;
};

export default function PaginaMunicipios({ params }: Props) {
  const { id } = use(params);
  const { data: municipio, isLoading } = useGetMunicipioById(id);

  return (
    <LayoutPublic>
      {isLoading || !municipio ? (
        <div className='flex items-center justify-center min-h-[60vh]'>
          <Progress className='w-24 h-24 animate-spin opacity-50' />
        </div>
      ) : (
        <>
          <Hero nome={municipio.nome} imagemUrl={municipio.fotos?.[0]?.url} />

          <DescriptionSection
            descricao={municipio?.descricao || 'Descrição não disponível.'}
          />

          <GaleriaDeImagens
            imagemUrls={municipio.fotos.map(
              (foto: { url: string }) => foto.url,
            )}
          />

          <div className='w-full bg-tourism-branco py-12'>
            <div className='container mx-auto flex flex-col items-center'>
              <h2 className='text-4xl font-bold pb-12 md:text-5xl'>
                Atrativos
              </h2>
              <AttractionsGallery />
            </div>
          </div>

          <Informacoes
            contato={{
              telefone: municipio.contato.telefone,
              email: municipio.contato.email,
              site: municipio.site || 'Site não disponível.',
            }}
            mapa={municipio.mapaUrl ?? undefined}
          />
        </>
      )}
    </LayoutPublic>
  );
}
