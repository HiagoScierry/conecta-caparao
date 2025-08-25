import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as LucideImage, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  initialFotos?: { id: string; url: string }[];
  onRemoveFoto?: (fotoId: string) => Promise<void>; // Mudança: agora é uma Promise
  onImagesSelect?: (files: File[]) => void;
  disabled?: boolean;
  maxImages?: number;
}

export function ImageUpload({
  initialFotos = [],
  onImagesSelect,
  onRemoveFoto,
  disabled,
  maxImages = 5,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentInitialFotos, setCurrentInitialFotos] = useState(initialFotos); // Novo estado para as fotos iniciais

  const allImages = [
    ...currentInitialFotos.map((foto) => ({ type: "initial", ...foto })),
    ...previews.map((src) => ({ type: "preview", url: src })),
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const totalFiles = currentInitialFotos.length + files.length + selectedFiles.length;
    if (totalFiles > maxImages) {
      alert(`Você pode enviar no máximo ${maxImages} imagens.`);
      return;
    }

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...selectedFiles]);
    onImagesSelect?.([...files, ...selectedFiles]);

    e.target.value = "";
  };

  const handleRemoveImage = async (index: number) => {
    if (index < currentInitialFotos.length) {
      // É uma imagem inicial
      const fotoParaRemover = currentInitialFotos[index];
        await onRemoveFoto?.(fotoParaRemover.id);
        // Se a remoção for bem-sucedida, atualize o estado local
        const newInitialFotos = currentInitialFotos.filter(
          (foto) => foto.id !== fotoParaRemover.id
        );
        setCurrentInitialFotos(newInitialFotos);
    } else {
      // É um preview
      const previewIndex = index - currentInitialFotos.length;
      const newPreviews = previews.filter((_, i) => i !== previewIndex);
      const newFiles = files.filter((_, i) => i !== previewIndex);

      setPreviews(newPreviews);
      setFiles(newFiles);
      onImagesSelect?.(newFiles);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || currentInitialFotos.length + files.length >= maxImages}
          onClick={() => document.getElementById("imageInput")?.click()}
          className="w-full"
        >
          <LucideImage className="mr-2 h-4 w-4" />
          Selecionar Imagem
        </Button>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          multiple
          disabled={disabled || currentInitialFotos.length + files.length >= maxImages}
        />
      </div>

      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="relative w-48 h-32 rounded-lg border overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover"
                sizes="100%"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-white bg-opacity-75 hover:bg-opacity-100 text-black rounded-full p-1"
                aria-label={`Remover imagem ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}