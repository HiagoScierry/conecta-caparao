import { ContatoDTO } from "@/dto/contatoDTO";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { MunicipioFull } from "@/repositories/interfaces/IMunicipioRepository";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

import { UseQueryResult } from "@tanstack/react-query";

export function useGetAllMunicipios(): UseQueryResult<MunicipioFull[], Error> {
  return useQuery<MunicipioFull[], Error>({
    queryKey: QUERY_KEYS.MUNICIPIOS,
    queryFn: async () => {
      const response = await fetch('/api/municipio');
      if (!response.ok) {
        throw new Error('Erro ao buscar municípios');
      }
      return response.json();
    }
  });
}

export function useGetMunicipioById(id: string) {
  return useQuery<MunicipioFull, Error>({
    queryKey: QUERY_KEYS.MUNICIPIO(id),
    queryFn: async () => {
      const response = await fetch(`/api/municipio/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar município');
      }
      return response.json();
    },
    enabled: !!id,
  });
}
      

export function useCreateMunicipio() {
  const { invalidateRelated } = useQueryInvalidation();

  return useMutation({
    mutationFn: async ({
      municipio,
      contato,
      fotosUrl,
    }: {
      municipio: MunicipioDTO;
      contato: ContatoDTO;
      fotosUrl: string[];
    }) => {
      const response = await fetch('/api/municipio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ municipio, contato, fotosUrl }),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar município');
      }
      return response.json();
    },
    onSuccess: () => {
      // Quando um município é criado, pode afetar múltiplas entidades
      invalidateRelated.onMunicipioChange();
    },
    onError: (error) => {
      console.error('Error creating municipio:', error);
    },
  });
}

export function useUpdateMunicipio() {
  const { invalidateRelated, invalidateMunicipio } = useQueryInvalidation();

  return useMutation({
    mutationFn: async ({
      id,
      municipio,
      contato,
      fotosUrl,
    }: {
      id: string;
      municipio: MunicipioDTO;
      contato: ContatoDTO;
      fotosUrl: string[];
    }) => {
      const response = await fetch(`/api/municipio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ municipio, contato, fotosUrl }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar município');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      // Quando um município é atualizado, pode afetar múltiplas entidades
      invalidateRelated.onMunicipioChange();
      // Também invalida o município específico
      invalidateMunicipio(variables.id);
    },
    onError: (error) => {
      console.error('Error updating municipio:', error);
    },
  });
}

export function useDeleteMunicipio() {
  const { invalidateRelated } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/municipio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar município');
      }
      return response.json();
    },
    onSuccess: () => {
      // Quando um município é deletado, pode afetar múltiplas entidades
      invalidateRelated.onMunicipioChange();
    },
    onError: (error) => {
      console.error('Error deleting municipio:', error);
    },
  });
}