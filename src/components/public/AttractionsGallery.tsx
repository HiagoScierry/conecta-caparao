import { Section } from '@/components/public/Section';
import { AttractionCard } from './AttractionCard';
import { FiImage } from 'react-icons/fi';

export function AttractionsGallery() {
  const attractions = [
    {
      title: 'Pico da Bandeira',
      description: '2.892 metros de altitude com vista panorâmica única',
      image: '/atracoes/mirante.webp',
      isLarge: true,
    },
    {
      title: 'Mirantes',
      description: 'Pontos estratégicos para fotos incríveis',
      image: '/atracoes/mirante.webp',
      isLarge: false,
    },
    {
      title: 'Nascer do Sol',
      description: 'Acima das nuvens, um espetáculo inesquecível',
      image: '/atracoes/nascer-do-sol.webp',
      isLarge: false,
    },
    {
      title: 'Trilhas Ecológicas',
      description: 'Caminhada entre a mata Atlântica...',
      image: '/atracoes/trilha.webp',
      isLarge: false,
    },
    {
      title: 'Cachoeiras',
      description: 'Águas cristalinas em meio à natureza',
      image: '/atracoes/cachoeira.webp',
      isLarge: false,
    },
  ];

  return (
    <Section className='py-24'>
      <div className='mb-20 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-azul uppercase'>
          DESCUBRA
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-new-marinho md:text-5xl'>
          Galeria de Atrativos
        </h2>
        <p className='font-sans mt-4 max-w-2xl text-[20px] text-new-cinza'>
          Explore as maravilhas naturais que fazem do Caparaó um destino único
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <div className='lg:col-span-2'>
          <AttractionCard
            title={attractions[0].title}
            description={attractions[0].description}
            image={attractions[0].image}
            isLarge={attractions[0].isLarge}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2'>
          {attractions.slice(1).map((item, index) => (
            <AttractionCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              isLarge={item.isLarge}
            />
          ))}
        </div>
      </div>

      <div className='mt-12 flex justify-center'>
        <button className='flex items-center gap-2 font-bold text-new-azul transition-colors hover:text-new-marinho'>
          Ver Todos os Atrativos <FiImage />
        </button>
      </div>
    </Section>
  );
}
