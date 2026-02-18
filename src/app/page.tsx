import Link from 'next/link';
import { LayoutPublic } from '@/components/public/Layout';
import { Section } from '@/components/public/Section';
import { GaleriaDeImagens } from '@/components/public/GaleriaDeImagens';
import { MunicipiosCard } from '@/components/public/MunicipiosCard';
import { Button } from '@/components/ui/button';
import { ExperienceSection } from '@/components/public/ExperienceSection';
import { AttractionsGallery } from '@/components/public/AttractionsGallery';
import { EventsSection } from '@/components/public/EventsSection';
import { MunicipialitiesSection } from '@/components/public/MunicipalitiesSection';
import { JourneySection } from '@/components/public/JourneySection';
import { NewsSection } from '@/components/public/NewsSection';
import { DefaultCard } from '@/components/public/DefaultCard';
import Image from 'next/image';

export default function Home() {
  const Carrosel = {
    imagemUrls: ['/atraction01.jpg', '/atraction02.jpg', '/atraction03.jpg'],
  };

  const municipios = [
    {
      id: 1,
      nome: 'Jerônimo Monteiro',
      imagemUrls: ['/municipios/jeronimo.jpg'],
    },
    {
      id: 2,
      nome: 'Alegre',
      imagemUrls: ['/municipios/alegre.jpg'],
    },
    {
      id: 3,
      nome: 'Guaçuí',
      imagemUrls: ['/municipios/guacui.jpg'],
    },
    {
      id: 4,
      nome: 'São José do Calçado',
      imagemUrls: ['/municipios/sao_jose_do_calcado.jpg'],
    },
    {
      id: 5,
      nome: 'Dores do Rio Preto',
      imagemUrls: ['/municipios/dores_do_rio_preto.jpg'],
    },
    {
      id: 6,
      nome: 'Divino de São Lourenço',
      imagemUrls: ['/municipios/divino_de_sao_lourenco.jpg'],
    },
  ];

  const eventos = [
    {
      id: 1,
      titulo: 'Festival de Inverno de Guaçuí',
      imagemUrl: '/eventos/evento01.jpg',
    },
    {
      id: 2,
      titulo: 'Festa do Café em Alegre',
      imagemUrl: '/eventos/evento02.jpg',
    },
    {
      id: 3,
      titulo: 'Caminhada Ecológica em Dores do Rio Preto',
      imagemUrl: '/eventos/evento03.jpg',
    },
  ];

  const noticias = [
    {
      id: 1,
      titulo: 'Caparaó é Destaque Nacional em Observação de Aves',
      imagemUrl: '/noticias/noticia01.jpg',
    },
    {
      id: 2,
      titulo: 'Inauguração do Centro de Visitantes em Jerônimo Monteiro',
      imagemUrl: '/noticias/noticia02.jpg',
    },
    {
      id: 3,
      titulo: 'Novas Trilhas Ecológicas em Divino de São Lourenço',
      imagemUrl: '/noticias/noticia03.jpg',
    },
  ];

  return (
    <LayoutPublic>
      <section className='relative h-[85vh] min-h-[500px] w-full overflow-hidden'>
        <Image
          fill
          src='/Hero.jpg'
          alt='Foto da região do caparaó com um por do sol entre montanhas'
          priority
          className='object-cover object-center'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

        <div className='container relative mx-auto flex h-full flex-col justify-end px-6 pb-20 md:px-16'>
          <div className='max-w-4xl'>
            <h1 className='font-title mb-4 text-5xl font-black leading-none uppercase text-white md:text-6xl lg:text-8xl'>
              CAPARAÓ
            </h1>

            <div className='w-fit rounded-md bg-gray-700/40 p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.10)] backdrop-blur-[1px] md:px-8 md:py-4'>
              <p className='font-sans text-2xl font-medium text-white opacity-90 md:text-3xl lg:text-4xl'>
                Um refúgio entre as nuvens
              </p>
            </div>
          </div>
        </div>
      </section>
      <ExperienceSection />

      <AttractionsGallery />

      <EventsSection />

      <MunicipialitiesSection />

      <JourneySection />

      <NewsSection />
    </LayoutPublic>
  );
}
