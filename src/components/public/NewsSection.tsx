import { Section } from '@/components/public/Section';
import { NewsCard } from './NewsCard';
import { FiArrowRight, FiSend } from 'react-icons/fi';

export function NewsSection() {
  const news = [
    {
      category: 'Ecoturismo',
      date: '15 Dez 2025',
      title: 'Caparaó é Destaque Nacional em Observação de Aves',
      description:
        'A região se consolida como um dos melhores destinos para observadores de aves, com mais de 400 espécies catalogadas[...]',
      image: '/noticias/noticia01.jpg',
      link: '/noticias/1',
    },
    {
      category: 'Cultura',
      date: '27 Dez 2025',
      title: 'Festival de Café das Montanhas Atrai Milhares',
      description:
        'Evento celebra a tradição cafeeira da região com degustações, workshops e apresentações culturais[...]',
      image: '/noticias/noticia02.jpg',
      link: '/noticias/2',
    },
    {
      category: 'Aventura',
      date: '01 Jan 2026',
      title: 'Nova Trilha Ecológica Inaugurada no Parque',
      description:
        'Percurso de 8km oferece vistas panorâmicas e acesso a cachoeiras preservadas para todos os níveis[...]',
      image: '/noticias/noticia03.jpg',
      link: '/noticias/3',
    },
  ];

  return (
    <Section bgClass='bg-gradient-menta' className='py-24'>
      <div className='mb-20 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-azul uppercase'>
          NOTÍCIAS
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-new-marinho md:text-5xl'>
          O Que Acontece no Caparaó
        </h2>
        <p className='font-sans mt-4 max-w-2xl text-[20px] text-new-cinza'>
          Fique por dentro das últimas novidades e descobertas da nossa região
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {news.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>

      <div className='mt-16 flex justify-center'>
        <button className='flex items-center gap-2 rounded-xl bg-new-marinho px-8 py-4 font-bold text-white transition-all hover:bg-blue-900 active:scale-[0.98]'>
          Ver Todas as Notícias <FiArrowRight />
        </button>
      </div>
    </Section>
  );
}
