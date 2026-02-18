import { Section } from '@/components/public/Section';
import { JourneyCard } from './JourneyCard';
import { FiSunrise, FiMap, FiCoffee, FiHeart } from 'react-icons/fi';

export function JourneySection() {
  const steps = [
    {
      number: '01',
      title: 'Amanhecer no Pico',
      description:
        'Testemunhe o nascer do sol no terceiro pico mais alto do Brasil, onde o céu se pinta de dourado.',
      icon: <FiSunrise size={24} />,
      borderColor: '#F5C6BB',
    },
    {
      number: '02',
      title: 'Trilhas Épicas',
      description:
        'Explore mais de 50 trilhas que variam de caminhadas leves a desafios para aventureiros experientes.',
      icon: <FiMap size={24} />,
      borderColor: '#78B6D9',
    },
    {
      number: '03',
      title: 'Sabores Locais',
      description:
        'Deguste o café produzido nas montanhas e pratos tradicionais que contam a história da região.',
      icon: <FiCoffee size={24} />,
      borderColor: '#ECFCE5',
    },
    {
      number: '04',
      title: 'Conexão Genuína',
      description:
        'Conheça comunidades acolhedoras que preservam tradições e compartilham suas histórias.',
      icon: <FiHeart size={24} />,
      borderColor: '#F5C6BB',
    },
  ];

  return (
    <Section bgClass='bg-new-marinho' className='py-24'>
      <div className='mb-20 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-menta uppercase'>
          SUA JORNADA
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-white md:text-5xl'>
          Momentos que Transformam
        </h2>
        <p className='font-sans mt-4 max-w-2xl text-[20px] text-white'>
          Cada experiência no Caparaó é uma página de uma história inesquecível
          que você vai escrever.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {steps.map((step) => (
          <JourneyCard key={step.number} {...step} />
        ))}
      </div>
    </Section>
  );
}
