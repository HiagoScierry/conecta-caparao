import React from "react";

interface DescriptionSectionProps {
    subtitulo?: string;
    descricao?: string;
    corSubtitulo?: string;
    corDescricao?: string;
}

export function DescriptionSection({ subtitulo, descricao, corSubtitulo, corDescricao }: DescriptionSectionProps) {
    return (
        <section className="w-full bg-tourism-branco py-12">
            <div className="container mx-auto flex flex-col items-center text-center px-4">
                {subtitulo && <h2 className="text-2xl md:text-4xl font-bold mb-8 max-w-3xl" style={{ color: corSubtitulo }}>{subtitulo}</h2>}
                {descricao && <p className="md:text-lg lg:text-xl max-w-3xl break-words" style={{ color: corDescricao }}>{descricao}</p>}
            </div>
        </section>
    );
}