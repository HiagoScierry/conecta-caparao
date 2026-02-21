import { principalAtrativoSchema } from "@/schemas/principalAtrativoSchema";
import { z } from "zod";

export type PrincipalAtrativoDTO = z.infer<typeof principalAtrativoSchema>;
