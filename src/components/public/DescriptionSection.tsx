import React from "react";
import { cn } from "@/lib/utils";

interface DescriptionSectionProps {
    subtitulo?: string;
    descricao?: string;
    corSubtitulo?: string;
    corDescricao?: string;
    align?: 'center' | 'left';
}

export function DescriptionSection({ subtitulo, descricao, corSubtitulo, corDescricao, align = 'center' }: DescriptionSectionProps) {
    return (
        <section className="w-full bg-tourism-branco py-12">
            <div className={cn("container mx-auto flex flex-col  items-center text-center  px-4", {"md:items-start md:text-start": align==="left"} )}>
                {subtitulo && <h2 className={cn("text-2xl md:text-4xl font-bold mb-8 max-w-3xl", corSubtitulo)}>{subtitulo}</h2>}
                {descricao && <p className={cn("md:text-lg lg:text-xl max-w-3xl break-words", corDescricao)}>{descricao}</p>}
            </div>
        </section>
    );
}