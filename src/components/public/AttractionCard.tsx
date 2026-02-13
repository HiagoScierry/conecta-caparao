import Image from 'next/image';
import { Button } from '../ui/button';

interface AttractionCardProps {
  image: string;
  title: string;
  description: string;
  isLarge?: boolean;
}

export function AttractionCard({
  image,
  title,
  description,
  isLarge = false,
}: AttractionCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[16px] lg:rounded-[24px] w-full ${
        isLarge ? 'h-[450px] md:h-[584px] lg:h-full' : 'h-[280px]'
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority={isLarge}
        className='object-cover transition-transform duration-700 group-hover:scale-110'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

      <div className='absolute bottom-0 flex flex-col p-6 md:p-8 w-full'>
        <h3
          className={`font-title font-bold text-white leading-tight ${
            isLarge ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
          }`}
        >
          {title}
        </h3>

        <p
          className={`font-sans mt-2 text-white/90 line-clamp-2 ${
            isLarge ? 'max-w-md text-lg' : 'text-sm'
          }`}
        >
          {description}
        </p>

        {isLarge && (
          <Button className='mt-6 w-fit rounded-[16px] lg:rounded-[24px] bg-white px-8 py-6 font-bold text-new-marinho transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95'>
            Explorar Agora
          </Button>
        )}
      </div>
    </div>
  );
}
