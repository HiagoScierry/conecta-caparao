import { CardMomento } from "./CardMomento";
import { Sunrise, Mountain, Coffee, Heart } from "lucide-react";

const momentos = [
  {
    id: 1,
    icone: Sunrise,
    numero: "01",
    titulo: "Amanhecer no Pico",
    descricao: "Testemunhe o nascer do sol no terceiro pico mais alto do Brasil onde o céu e as matas se tocam"
  },
  {
    id: 2,
    icone: Mountain,
    numero: "02",
    titulo: "Trilhas Épicas",
    descricao: "Explore mais de 50 trilhas que passam por cachoeiras, florestas e desafios para aventureiros experientes"
  },
  {
    id: 3,
    icone: Coffee,
    numero: "03",
    titulo: "Sabores Locais",
    descricao: "Deguste o café produzido nas montanhas e pratos tradicionais que contam a história da região"
  },
  {
    id: 4,
    icone: Heart,
    numero: "04",
    titulo: "Conexão Genuína",
    descricao: "Conheça comunidades acolhedoras que preservam tradições e compartilham suas histórias"
  }
];

export function SecaoMomentos() {
  return (
    <section className="bg-tourism-marinho py-12 md:py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 space-y-3">
          <p className="text-tourism-azul-claro text-xs md:text-sm font-semibold tracking-wider uppercase">
            SUA JORNADA
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            Momentos que Transformam
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl">
            Cada experiência no Caparaó é uma página de uma história inesquecível que você vai escrever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {momentos.map((momento) => (
            <CardMomento
              key={momento.id}
              icone={momento.icone}
              numero={momento.numero}
              titulo={momento.titulo}
              descricao={momento.descricao}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
