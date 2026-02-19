import Image from "next/image";

interface HeroProps {
  titulo: string;
  subtitulo?: string;
  imagemUrl: string;
}

export function Hero({ titulo, subtitulo, imagemUrl }: HeroProps) {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px]">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-tourism-marinho/80 via-tourism-marinho/40 to-transparent"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-28 2xl:px-32">
          <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-3 md:mb-4 xl:mb-6 leading-tight">
              {titulo}
            </h1>
            {subtitulo && (
              <p className="font-normal text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/95 leading-relaxed max-w-2xl xl:max-w-3xl">
                {subtitulo}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
