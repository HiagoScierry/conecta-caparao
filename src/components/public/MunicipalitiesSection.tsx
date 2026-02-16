import { Section } from '@/components/public/Section';
import { MunicipalityCard } from './MunicipalityCard';
import { FiMap } from 'react-icons/fi';

export function MunicipialitiesSection() {
  const cities = [
    {
      name: 'Alegre',
      description: 'Portal do Caparaó com charme histórico e cultura cafeeira.',
      image: '/municipios/alegre.jpg',
    },
    {
      name: 'Rio das Dores',
      description: 'Natureza exuberante e hospitalidade que encanta a todos.',
      image: '/municipios/dores_do_rio_preto.jpg',
    },
    {
      name: 'São José dos Caçados',
      description: 'Tambem conhecida como cidade jardim',
      image: '/municipios/sao_jose_do_calcado.jpg',
    },
  ];

  return (
    <Section bgClass='bg-new-marinho' className='py-24'>
      <header className='mb-20 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-menta uppercase'>
          DESTINOS
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-white md:text-5xl'>
          Municípios que Encantam
        </h2>
        <p className='font-sans mt-4 max-w-2xl text-[20px] text-white'>
          Cada cidade da região do Caparaó tem sua própria personalidade e
          histórias para contar.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {cities.map((city, index) => (
          <MunicipalityCard key={index} {...city} />
        ))}
      </div>

      <div className='mt-16 flex justify-center'>
        <button className='flex items-center gap-2 text-[18px] font-bold text-new-menta transition-colors hover:text-white'>
          Ver Todos os Municípios <FiMap />
        </button>
      </div>
    </Section>
  );
}
