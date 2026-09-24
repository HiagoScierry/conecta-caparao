import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const HTML_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
}

/**
 * Converte o HTML gerado pelo editor de texto rico (Quill) em texto simples,
 * para exibição em listagens, tabelas e cards de resumo.
 * Não depende do DOM, então funciona tanto no servidor quanto no navegador.
 */
export function htmlToPlainText(html?: string | null): string {
  if (!html) return ""
  return html
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6])\s*\/?>/gi, " ") // quebras viram espaço
    .replace(/<[^>]*>/g, "") // remove as demais tags
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code: string) => {
      if (code[0] === "#") {
        const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
        return Number.isNaN(n) ? entity : String.fromCodePoint(n)
      }
      return HTML_ENTITIES[code.toLowerCase()] ?? entity
    })
    .replace(/\s+/g, " ")
    .trim()
}

/** Versão em texto simples, cortada em `max` caracteres sem quebrar palavras. */
export function truncatePlainText(html: string | null | undefined, max: number): string {
  const text = htmlToPlainText(html)
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…"
}
