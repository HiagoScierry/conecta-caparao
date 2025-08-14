import React from "react";

interface DescriptionSectionProps {
    subtitulo?: string;
    descricao?: string;
}

export function DescriptionSection({ subtitulo, descricao }: DescriptionSectionProps) {
    return (
        <section className="w-full bg-tourism-branco py-12">
            <div className="container mx-auto flex flex-col items-center text-center px-4">
                {subtitulo && <h2 className="text-2xl md:text-4xl font-bold text-tourism-azul mb-8 max-w-3xl">{subtitulo}</h2>}
                {descricao && <p className="md:text-lg lg:text-xl text-tourism-cinza max-w-3xl break-words">{descricao}</p>}
            </div>
        </section>
    );
}