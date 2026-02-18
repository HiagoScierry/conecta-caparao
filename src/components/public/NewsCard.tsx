import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

interface NewsCardProps {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export function NewsCard({
  category,
  date,
  title,
  description,
  image,
  link,
}: NewsCardProps) {
  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 group '>
      <div className='relative h-[240px] w-full shrink-0 overflow-hidden '>
        <Image
          src={image}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-cover group-hover:scale-110 transition-transform duration-700'
        />
        <div className='absolute left-6 top-6 rounded-full bg-new-azul px-4 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm'>
          {category}
        </div>
      </div>

      <div className='flex flex-1 flex-col p-8'>
        <div className='mb-4 flex items-center gap-2 text-xs font-medium text-new-cinza'>
          <FiCalendar className='shrink-0' />
          <span>{date}</span>
        </div>

        <h3
          className='font-title mb-3 text-xl font-bold leading-tight text-new-marinho line-clamp-2'
          title={title}
        >
          {title}
        </h3>

        <p className='font-sans mb-6 text-sm leading-relaxed text-new-cinza line-clamp-3'>
          {description}
        </p>

        <div className='mt-auto'>
          <Link
            href={link}
            className='inline-flex items-center gap-2 text-sm font-bold hover:text-new-marinho'
          >
            Ler mais
            <FiArrowRight className='' />
          </Link>
        </div>
      </div>
    </div>
  );
}
