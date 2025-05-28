interface MunicipioCardProps {
    titulo?: string;
    img?: string;
}

export function MunicipioCard({ titulo, img }: MunicipioCardProps) {
    const tituloCard = titulo || "Nome do Município";
    return (
        <div className="bg-bege-areia p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-verde-floresta mb-2">Nome do Município</h2>
        <p className="text-gray-700 mb-4">Descrição breve do município, destacando suas características e atrativos.</p>
        <a href="#" className="text-azul-claro hover:underline">Saiba mais</a>
        </div>
    );
}