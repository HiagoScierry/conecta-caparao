import { ReactNode } from "react";

interface SecaoExperienciasProps {
  tituloDestaque: string;
  tituloPrincipal: string;
  children: ReactNode;
}

export function SecaoExperiencias({ tituloDestaque, tituloPrincipal, children }: SecaoExperienciasProps) {
  return (
    <section className="w-full bg-gradient-menta py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-left mb-10 md:mb-12">
          <p className="text-tourism-azul-claro text-sm md:text-base font-semibold uppercase tracking-wide mb-2">
            {tituloDestaque}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tourism-marinho">
            {tituloPrincipal}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {children}
        </div>
      </div>
    </section>
  );
}
