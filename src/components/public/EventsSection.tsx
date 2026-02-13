import { Section } from '@/components/public/Section';
import { EventCard } from './EventCard';
import { FiExternalLink } from 'react-icons/fi';

export function EventsSection() {
  const events = [
    {
      title: 'Festival de Inverno do Caparaó',
      description:
        'Celebração da cultura local com música, gastronomia e artesanato da região.',
      date: '15-17 Jul 2025',
      location: 'Alto Caparaó, MG',
      time: '09:00 - 20:00',
      image: '/eventos/festival.webp',
    },
    {
      title: 'Travessia do Pico da Bandeira',
      description:
        'Expedição guiada ao terceiro pico mais alto do Brasil com nascer do sol.',
      date: '20-22 Ago 2025',
      location: 'Parque Nacional',
      time: '05:00 - 18:00',
      image: '/eventos/travessia.webp',
    },
    {
      title: 'Circuito das Cachoeiras',
      description:
        'Trilha guiada pelas principais cachoeiras da região com banho refrescante.',
      date: '10 Set 2025',
      location: 'Dores do Rio Preto, ES',
      time: '07:00 - 16:00',
      image: '/eventos/cachoeiras.webp',
    },
  ];

  return (
    <Section bgClass='bg-gradient-menta' className='py-24'>
      <header className='mb-12 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-azul uppercase'>
          PRÓXIMOS ACONTECIMENTOS
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-new-marinho md:text-5xl'>
          Eventos e Experiências
        </h2>
        <p className='font-sans mt-4 max-w-2xl text-[20px] text-new-cinza'>
          Participe dos melhores momentos da região do Caparaó.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <div className='mt-16 flex justify-center'>
        <button className='flex items-center gap-2 font-bold text-new-azul transition-colors hover:text-new-marinho'>
          Ver Todos os Eventos <FiExternalLink />
        </button>
      </div>
    </Section>
  );
}
