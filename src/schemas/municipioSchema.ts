import { z } from "zod";

export const municipioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  descricao: z.string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(3000, "Descrição deve ter no máximo 3000 caracteres")
    .optional(),
  site: z.string().url("URL do site deve ser válida").optional().or(z.literal("")),
  imagemUrl: z.string().url("URL da imagem deve ser válida").optional().or(z.literal("")),
  mapaUrl: z.string().url("URL do mapa deve ser válida").optional().or(z.literal("")),
})