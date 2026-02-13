import Image from 'next/image';
import { Button } from '../ui/button';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
}

export function EventCard({
  image,
  title,
  description,
  date,
  location,
  time,
}: EventCardProps) {
  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-lg transition-all hover:shadow-2xl'>
      <div className='relative h-[240px] w-full shrink-0'>
        <Image src={image} alt={title} fill className='object-cover' />
        <div className='absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[#F5C6BB] px-4 py-2 text-sm font-bold text-white shadow-sm'>
          <FaCalendarAlt className='text-xs' />
          {date}
        </div>
      </div>

      <div className='flex flex-1 flex-col p-8'>
        <h3 className='font-title min-h-[4rem] text-2xl font-bold leading-tight text-new-marinho line-clamp-2'>
          {title}
        </h3>

        <p className='font-sans mb-6 mt-3 text-sm leading-relaxed text-new-cinza line-clamp-2'>
          {description}
        </p>

        <div className='mt-auto'>
          <div className='mb-8 flex flex-col gap-3'>
            <div className='flex items-center gap-3 text-sm text-new-cinza'>
              <FaMapMarkerAlt className='text-blue-300' />
              <span>{location}</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-new-cinza'>
              <FaClock className='text-blue-300' />
              <span>{time}</span>
            </div>
          </div>

          <Button className='w-full rounded-2xl bg-new-marinho py-6 font-bold text-white transition-all hover:bg-blue-900 active:scale-[0.98]'>
            Saiba Mais
          </Button>
        </div>
      </div>
    </div>
  );
}
