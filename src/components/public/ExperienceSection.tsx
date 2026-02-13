import React from 'react';
import { Section } from './Section';
import { ExperienceCard } from './ExperienceCard';

import {
  FaUtensils,
  FaBed,
  FaMountain,
  FaHandshake,
  FaInfoCircle,
} from 'react-icons/fa';

export function ExperienceSection() {
  const experiences = [
    {
      title: 'Gastronomia',
      description: 'Sabores únicos da montanha',
      icon: <FaUtensils />,
    },
    {
      title: 'Hospedagem',
      description: 'Aconchego e conforto na natureza',
      icon: <FaBed />,
    },
    {
      title: 'Atrativos',
      description: 'Cachoeiras, picos e paisagens de tirar o fôlego',
      icon: <FaMountain />,
    },
    {
      title: 'Serviços',
      description: 'Guias, tours e experiências',
      icon: <FaHandshake />,
    },
    {
      title: 'Apoio',
      description: 'Informações e assistência',
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <Section bgClass='bg-gradient-menta' className='py-24'>
      <div className='mb-20 text-left'>
        <span className='text-[18px] font-bold tracking-[0.2em] text-new-azul uppercase'>
          O QUE TE ESPERA
        </span>
        <h2 className='font-title mt-4 text-4xl font-black text-new-marinho md:text-5xl'>
          Experiências Autênticas
        </h2>
      </div>

      <div
        className='
                flex gap-6 overflow-x-auto pb-10 
                snap-x snap-mandatory scrollbar-hide
                md:grid md:grid-cols-3 md:overflow-visible 
                lg:grid-cols-5
            '
      >
        {experiences.map((exp, index) => (
          <div key={index} className='snap-center'>
            <ExperienceCard
              title={exp.title}
              description={exp.description}
              icon={exp.icon}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
