import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./useQueryInvalidation";

export function useDash() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: async () => {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do dashboard');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 1, // 1 minuto
  });
}
