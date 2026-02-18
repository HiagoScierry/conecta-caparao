import { ReactNode } from 'react';

interface JourneyCardProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  borderColor: string;
}

export function JourneyCard({
  number,
  title,
  description,
  icon,
  borderColor,
}: JourneyCardProps) {
  return (
    <div className='relative flex items-start gap-6 overflow-hidden rounded-2xl bg-white/5 p-8 transition-all hover:bg-white/10'>
      <div
        className='absolute left-0 top-0 h-full w-1'
        style={{ backgroundColor: borderColor }}
      />

      <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white'>
        {icon}
      </div>

      <div className='flex flex-col pr-8'>
        <h3 className='font-title text-xl font-bold text-white'>{title}</h3>
        <p className='font-sans mt-2 text-sm leading-relaxed text-gray-400'>
          {description}
        </p>
      </div>

      <div className='absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-gray-500'>
        {number}
      </div>
    </div>
  );
}
