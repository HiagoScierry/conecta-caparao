import Image from "next/image";

export function SecaoApoio() {
  return (
    <section className="w-full bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Lado Esquerdo: Identidade e Contato */}
        <div className="flex items-center gap-6">
          <Image
            src="/Logomarca.svg"
            alt="AD Caparaó"
            width={80}
            height={80}
            className="opacity-80"
          />
          <div className="border-l pl-6 border-gray-300">
            <h4 className="font-bold text-tourism-marinho text-lg">
              AD Caparaó
            </h4>
            <p className="text-sm text-gray-600">
              Agência de Desenvolvimento do Caparaó
            </p>
            <p className="text-sm font-medium mt-1">contato@adcaparao.com.br</p>
          </div>
        </div>

        {/* Lado Direito: Logos de Apoio */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
            Apoio
          </span>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Espaços para as logomarcas dos parceiros */}
            <div
              className="w-24 h-12 bg-gray-200 rounded animate-pulse"
              title="Parceiro 1"
            />
            <div
              className="w-24 h-12 bg-gray-200 rounded animate-pulse"
              title="Parceiro 2"
            />
            <div
              className="w-24 h-12 bg-gray-200 rounded animate-pulse"
              title="Parceiro 3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
