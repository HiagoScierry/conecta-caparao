import { ReactNode } from 'react';

interface ExperienceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ExperienceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ExperienceCard({
  title,
  description,
  icon,
}: ExperienceCardProps) {
  return (
    <div className='flex h-full min-w-[260px] flex-col items-center justify-between rounded-2xl bg-white p-10 shadow-xl transition-all hover:-translate-y-2 md:min-w-0'>
      <div className='flex flex-col items-center'>
        <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-new-menta bg-new-azul text-4xl text-white drop-shadow-md'>
          {icon}
        </div>

        <h3 className='font-title mb-2 text-center text-2xl font-bold text-new-marinho'>
          {title}
        </h3>
        <p className='font-sans text-center text-sm leading-relaxed text-gray-500'>
          {description}
        </p>
      </div>

      <div className='mt-8 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-400 to-red-300 opacity-60' />
    </div>
  );
}
