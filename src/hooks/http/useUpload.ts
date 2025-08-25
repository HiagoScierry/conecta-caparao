import { useMutation } from "@tanstack/react-query";

export function useUpload() {
  return useMutation<string, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer upload da imagem");
      }

      const data = await response.json();
      if (!data.fileUrl) {
        throw new Error("URL da imagem não retornada");
      }

      return data.fileUrl;
    }
  });
}


export function useDeleteUpload() {
  return useMutation<void, Error, string>({
    mutationFn: async (fotoId: string) => {
      const response = await fetch(`/api/delete-upload/${fotoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar a imagem");
      }
    }
  });
}