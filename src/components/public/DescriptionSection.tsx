import React from "react";
import { cn } from "@/lib/utils";

type AlignmentType = 'center' | 'left' | 'right';

interface DescriptionSectionProps {
  /**
   * Subtítulo da seção
   */
  subtitulo?: string;
  /**
   * Descrição principal da seção
   */
  descricao?: string;
  /**
   * Classes CSS personalizadas para o subtítulo
   */
  corSubtitulo?: string;
  /**
   * Classes CSS personalizadas para a descrição
   */
  corDescricao?: string;
  /**
   * Alinhamento do conteúdo
   * @default 'center'
   */
  align?: AlignmentType;
  /**
   * Classes CSS personalizadas para a seção
   */
  className?: string;
  /**
   * Classes CSS personalizadas para o container
   */
  containerClassName?: string;
}

export function DescriptionSection({
  subtitulo,
  descricao,
  corSubtitulo,
  corDescricao,
  align = 'center',
  className,
  containerClassName
}: DescriptionSectionProps) {
  // Se não há conteúdo para mostrar, não renderiza nada
  if (!subtitulo && !descricao) {
    return null;
  }

  const getAlignmentClasses = (alignment: AlignmentType) => {
    switch (alignment) {
      case 'left':
        return "items-start text-left md:items-start md:text-start";
      case 'right':
        return "items-end text-right md:items-end md:text-end";
      case 'center':
      default:
        return "items-center text-center";
    }
  };

  return (
    <section className={cn("w-full bg-tourism-branco py-12", className)}>
      <div className={cn(
        "container mx-auto flex flex-col px-4 space-y-4",
        getAlignmentClasses(align),
        containerClassName
      )}>
        {subtitulo && (
          <h2 className={cn(
            "text-2xl md:text-4xl font-bold max-w-3xl",
            corSubtitulo
          )}>
            {subtitulo}
          </h2>
        )}

        {descricao && (
          <div 
            className={cn(
              "md:text-lg lg:text-xl max-w-3xl break-words leading-relaxed prose prose-lg max-w-none",
              corDescricao
            )}
            dangerouslySetInnerHTML={{ __html: descricao }}
          />
        )}
      </div>
    </section>
  );
}