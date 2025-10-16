import { useQueryClient } from "@tanstack/react-query";

// Chaves de query centralizadas
export const QUERY_KEYS = {
  // Listagens principais
  NOTICIAS: ["noticias"] as const,
  EVENTOS: ["eventos"] as const,
  ATRATIVOS: ["atrativos"] as const,
  SERVICOS: ["servicos"] as const,
  MUNICIPIOS: ["municipios"] as const,
  CATEGORIAS: ["categorias"] as const,
  SUBCATEGORIAS: ["subcategorias"] as const,
  PERFIS: ["perfis"] as const,
  
  // Itens específicos
  NOTICIA: (id: number) => ["noticia", id] as const,
  EVENTO: (id: number) => ["evento", id] as const,
  ATRATIVO: (id: number) => ["atrativo", id] as const,
  SERVICO: (id: number) => ["servico", id] as const,
  MUNICIPIO: (id: string) => ["municipio", id] as const,
  
  // Dashboard e outras queries
  DASHBOARD: ["dash"] as const,
} as const;

// Hook para invalidações centralizadas
export function useQueryInvalidation() {
  const queryClient = useQueryClient();

  return {
    // Invalidar todas as listagens relacionadas a um tipo de entidade
    invalidateNoticias: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTICIAS });
      // Também invalida queries específicas de notícias
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] === "noticia" 
      });
    },

    invalidateEventos: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTOS });
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] === "evento" 
      });
    },

    invalidateAtrativos: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVOS });
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] === "atrativo" 
      });
    },

    invalidateServicos: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICOS });
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] === "servico" 
      });
    },

    invalidateMunicipios: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MUNICIPIOS });
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] === "municipio" 
      });
    },

    invalidateCategorias: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIAS });
    },

    invalidateSubcategorias: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUBCATEGORIAS });
    },

    invalidatePerfis: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PERFIS });
    },

    invalidateDashboard: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
    },

    // Invalidação específica de um item
    invalidateNoticia: (id: number) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTICIA(id) });
    },

    invalidateEvento: (id: number) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTO(id) });
    },

    invalidateAtrativo: (id: number) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVO(id) });
    },

    invalidateServico: (id: number) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICO(id) });
    },

    invalidateMunicipio: (id: string) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MUNICIPIO(id) });
    },

    // Invalidação global para mudanças que afetam múltiplas entidades
    invalidateAll: () => {
      queryClient.invalidateQueries();
    },

    // Invalidação relacionada - quando uma mudança afeta outras entidades
    invalidateRelated: {
      // Quando categorias mudam, pode afetar atrativos e serviços
      onCategoriaChange: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIAS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVOS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICOS });
      },

      // Quando subcategorias mudam, pode afetar atrativos e serviços
      onSubcategoriaChange: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUBCATEGORIAS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVOS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICOS });
      },

      // Quando perfis mudam, pode afetar atrativos
      onPerfilChange: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PERFIS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVOS });
      },

      // Quando município muda, pode afetar atrativos, serviços e eventos
      onMunicipioChange: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MUNICIPIOS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATRATIVOS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICOS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTOS });
      },
    }
  };
}
