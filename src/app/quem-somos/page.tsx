import { LayoutPublic } from "@/components/public/Layout";
import { Banner } from "@/components/public/Banner";
import Image from "next/image";

export default function QuemSomosPage() {
  const diretoria = [
    {
      nome: "Rodrigo José Gonçalves Monteiro",
      cargo: "Presidente",
      foto: "/diretores/rodrigo.jpg",
    },
    {
      nome: "Francisco Lemos Faleiro",
      cargo: "Diretor técnico",
      foto: "/diretores/francisco.jpg",
    },
    {
      nome: "Flávio Sales",
      cargo: "Diretor financeiro",
      foto: "/diretores/flavio.jpg",
    },
    {
      nome: "Tatiana Favoreto",
      cargo: "Diretora suplente",
      foto: "/diretores/tatiana.jpg",
    },
  ];
  const valores = [
    {
      titulo: "Ética e Transparência",
      desc: "Atuar com integridade em todas as ações, garantindo a lisura nos processos e a prestação de contas à sociedade.",
    },
    {
      titulo: "Sustentabilidade",
      desc: "Buscar o equilíbrio entre o desenvolvimento econômico e a preservação do meio ambiente para as futuras gerações.",
    },
    {
      titulo: "Cooperação e Parceria",
      desc: "Estimular o espírito de união entre os municípios associados e os diversos setores da cadeia produtiva.",
    },
    {
      titulo: "Valorização das Pessoas",
      desc: "Reconhecer o talento local, promovendo a inclusão social e o respeito à diversidade cultural.",
    },
    {
      titulo: "Inovação",
      desc: "Aplicar criatividade e tecnologia na promoção do destino e na solução de desafios do setor turístico.",
    },
  ];

  return (
    <LayoutPublic>
      <Banner titulo="QUEM SOMOS" cor="bg-tourism-azul" />

      <div className="container mx-auto py-12 px-4 md:px-16 space-y-20">
        {/* SEÇÃO: HISTÓRIA  */}
        <section className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-tourism-azul">
              Nossa História
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              A AD CAPARAÓ - Associação Caparaó Turismo & Eventos - Agência de
              Desenvolvimento Caparaó – é uma entidade fundada em abril de 2022,
              sem fins lucrativos, sediada no município de Ibitirama. É fruto da
              união entre a iniciativa privada e o poder público, com o intuito
              de promover o desenvolvimento sustentável do turismo na região do
              Caparaó do Espírito Santo.
            </p>
          </div>
          <div className="md:w-1/2 bg-gray-100 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden shadow-inner">
            <Image
              src="/Hero.jpg"
              alt="Imagem da região do Caparaó"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-tourism-azul text-white rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2 italic">
              Missão
            </h3>
            <p className="text-blue-50 leading-relaxed">
              Promover o desenvolvimento sustentável do turismo na Região
              Turística Caparaó através da integração entre o poder público, a
              iniciativa privada e as organizações da sociedade civil... gerando
              renda e oportunidades às comunidades locais.
            </p>
          </div>
          <div className="p-8 bg-tourism-verde text-white rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2 italic">
              Visão
            </h3>
            <p className="text-green-50 leading-relaxed">
              Ser a instância de governança de referência nacional no
              desenvolvimento do turismo regional sustentável... transformando o
              potencial natural e cultural do Caparaó em um produto turístico
              competitivo e inovador até 2030.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-tourism-marinho">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((v, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-white"
              >
                <h4 className="text-2xl font-bold text-tourism-verde mb-2">
                  {v.titulo}
                </h4>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm italic">
            Esses valores norteiam todas as ações da AD CAPARAÓ, desde a
            elaboração de planos até a execução de programas.
          </p>
        </section>

        {/* SEÇÃO: DIRETORIA  */}
        <section className="bg-gray-50 py-12 px-6 rounded-3xl">
          <h2 className="text-2xl font-bold text-center mb-12">
            Diretoria em Exercício
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {diretoria.map((membro, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg group-hover:border-tourism-verde transition-all relative">
                  <Image
                    src={membro.foto}
                    alt={`Foto do membro ${membro.nome}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <h4 className="font-bold text-gray-800 text-center leading-tight">
                  {membro.nome}
                </h4>

                <p className="text-tourism-verde text-sm uppercase tracking-wide mt-1">
                  {membro.cargo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO: LINKS EXTERNOS  */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div
            id="associado"
            className="flex flex-col items-center p-10 bg-white   text-center space-y-4"
          >
            <h3 className="text-xl font-bold">Seja um Associado</h3>
            <p className="text-gray-600 text-sm">
              Junte-se à união entre o poder público e a iniciativa privada para
              fortalecer nossa região.
            </p>
            <a
              href="https://docs.google.com/forms/d/1hSwgmhzCfEK-zRB1h2Z0JosTFgK6hAvErIiQ6giNYA0/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tourism-verde text-white px-8 py-3 rounded-full font-bold hover:brightness-90 transition-all"
            >
              FORMULÁRIO DE ADESÃO
            </a>
          </div>

          <div
            id="transparencia"
            className="flex flex-col items-center p-10 bg-white text-center space-y-4"
          >
            <h3 className="text-xl font-bold">Portal da Transparência</h3>
            <p className="text-gray-600 text-sm">
              Acesse documentos, estatutos e termos de fomento da agência.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1GL0cBMLU6P4Qceu13JMARbBTlh9wRi25?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tourism-azul text-white px-8 py-3 rounded-full font-bold hover:brightness-90 transition-all"
            >
              ACESSAR DRIVE PÚBLICO
            </a>
          </div>
        </section>
      </div>
    </LayoutPublic>
  );
}
