import React from "react";
import { cn } from "@/lib/utils";

type AlignmentType = "center" | "left" | "right";

interface DescriptionSectionProps {
  subtitulo?: string;
  titulo?: string;
  descricao?: string;
  align?: AlignmentType;
  className?: string;
  containerClassName?: string;
  preserveLineBreaks?: boolean;
}

export function DescriptionSection({
  subtitulo,
  titulo,
  descricao,
  align = "center",
  className,
  containerClassName,
  preserveLineBreaks = false,
}: DescriptionSectionProps) {
  if (!subtitulo && !titulo && !descricao) {
    return null;
  }

  const getAlignmentClasses = (alignment: AlignmentType) => {
    switch (alignment) {
      case "left":
        return "items-start text-left md:items-start md:text-left";
      case "right":
        return "items-end text-right md:items-end md:text-right";
      case "center":
      default:
        return "items-center text-center";
    }
  };

  const normalizedDescricao = descricao
    ? descricao
        .replace(/\r\n/g, "\n")
        .replace(/&nbsp;|\u00a0/g, " ")
    : "";

  const containsHtml = normalizedDescricao
    ? /<[^>]+>/.test(normalizedDescricao)
    : false;

  const plainParagraphs = !containsHtml && normalizedDescricao
    ? normalizedDescricao
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  const paragraphTextBlocks = !preserveLineBreaks
    ? plainParagraphs.map((paragraph) => paragraph.replace(/\s*\n\s*/g, " "))
    : [];

  const paragraphHtmlBlocks = preserveLineBreaks
    ? plainParagraphs.map((paragraph) =>
        paragraph
          .split(/\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .join("<br />")
      )
    : [];

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 md:space-y-6",
        getAlignmentClasses(align),
        containerClassName,
        className,
      )}
    >
      {subtitulo && (
        <span className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-tourism-verde">
          {subtitulo}
        </span>
      )}

      {titulo && (
        <h2 className="text-3xl md:text-5xl font-bold text-tourism-marinho max-w-3xl">
          {titulo}
        </h2>
      )}

      {containsHtml && normalizedDescricao && (
        <div
          className="text-base md:text-lg text-tourism-cinza-escuro leading-relaxed prose prose-lg break-words"
          dangerouslySetInnerHTML={{ __html: normalizedDescricao }}
        />
      )}

      {!containsHtml && !preserveLineBreaks && paragraphTextBlocks.length > 0 && (
        <div className="space-y-4 text-base md:text-lg text-tourism-cinza-escuro leading-relaxed">
          {paragraphTextBlocks.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {!containsHtml && preserveLineBreaks && paragraphHtmlBlocks.length > 0 && (
        <div className="space-y-4 text-base md:text-lg text-tourism-cinza-escuro leading-relaxed">
          {paragraphHtmlBlocks.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )}
    </div>
  );
}
