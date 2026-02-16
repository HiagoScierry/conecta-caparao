import Image from 'next/image';
import { Button } from '../ui/button';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

interface MunicipalityCardProps {
  name: string;
  description: string;
  image: string;
}

export function MunicipalityCard({
  name,
  description,
  image,
}: MunicipalityCardProps) {
  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-xl transition-all hover:-translate-y-2'>
      <div className='relative h-[320px] md:h-[380px] w-full overflow-hidden shrink-0'>
        <Image
          src={image}
          alt={name}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-cover transition-transform duration-700 group-hover:scale-110'
        />

        <div className='absolute left-6 top-6 flex max-w-[85%] items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-new-marinho shadow-md backdrop-blur-sm'>
          <FaMapMarkerAlt className='text-blue-400 shrink-0' />
          <span className='truncate' title={name}>
            {name}
          </span>
        </div>
      </div>

      <div className='flex flex-col p-8 h-[200px] justify-between bg-white'>
        <div className='flex flex-col gap-1'>
          <h3
            className='font-title text-xl font-bold text-new-marinho truncate'
            title={name}
          >
            {name}
          </h3>

          <p className='font-sans text-sm leading-relaxed text-gray-500 h-[4.5rem] line-clamp-3'>
            {description}
          </p>
        </div>

        <Button className='flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ECFCE5] py-7 font-bold text-new-marinho transition-all hover:bg-[#dff7d5] active:scale-[0.98]'>
          <span className='truncate'>Explorar {name}</span>
          <FaArrowRight className='text-xs shrink-0' />
        </Button>
      </div>
    </div>
  );
}
