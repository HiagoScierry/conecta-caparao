import { PerfilCliente } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./useQueryInvalidation";

export function usePerfis() {
  return useQuery<PerfilCliente[], Error>({
    queryKey: QUERY_KEYS.PERFIS,
    queryFn: async () => {
      const response = await fetch("/api/perfis");
      if (!response.ok) {
        throw new Error("Failed to fetch perfis");
      }
      return response.json();
    }
  })
}
