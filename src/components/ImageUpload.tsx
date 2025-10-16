import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as LucideImage, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  initialFotos?: { id: string; url: string }[];
  onRemoveFoto?: (fotoId: string) => Promise<void>;
  onImagesSelect?: (files: File[]) => void;
  disabled?: boolean;
  maxImages?: number;
  multiple?: boolean; // Permitir múltiplas imagens
}

export function ImageUpload({
  initialFotos = [],
  onImagesSelect,
  onRemoveFoto,
  disabled,
  maxImages = 5,
  multiple = true,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentInitialFotos, setCurrentInitialFotos] = useState(initialFotos);

  // Ajuste do limite quando multiple = false
  const effectiveMaxImages = multiple ? maxImages : 1;
  const totalImages = currentInitialFotos.length + files.length;

  const allImages = [
    ...currentInitialFotos.map((foto) => ({ type: "initial", ...foto })),
    ...previews.map((src) => ({ type: "preview", url: src })),
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (!multiple && selectedFiles.length > 1) {
      alert("Somente uma imagem pode ser enviada.");
    }

    const filesToAdd = multiple ? selectedFiles : selectedFiles.slice(0, 1);
    const newTotal = totalImages + filesToAdd.length;

    if (totalImages >= effectiveMaxImages) {
      alert(`Você já atingiu o limite de ${effectiveMaxImages} imagem${effectiveMaxImages > 1 ? "s" : ""}.`);
      e.target.value = "";
      return;
    }

    if (newTotal > effectiveMaxImages) {
      alert(`Você pode enviar no máximo ${effectiveMaxImages} imagem${effectiveMaxImages > 1 ? "s" : ""}.`);
      e.target.value = "";
      return;
    }

    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...filesToAdd]);
    onImagesSelect?.([...files, ...filesToAdd]);

    e.target.value = "";
  };

  const handleRemoveImage = async (index: number) => {
    if (index < currentInitialFotos.length) {
      const fotoParaRemover = currentInitialFotos[index];
      await onRemoveFoto?.(fotoParaRemover.id);
      setCurrentInitialFotos((prev) => prev.filter((f) => f.id !== fotoParaRemover.id));
    } else {
      const previewIndex = index - currentInitialFotos.length;
      setPreviews((prev) => prev.filter((_, i) => i !== previewIndex));
      const newFiles = files.filter((_, i) => i !== previewIndex);
      setFiles(newFiles);
      onImagesSelect?.(newFiles);
    }
  };

  console.log({ allImages, currentInitialFotos, previews, files });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || totalImages >= effectiveMaxImages}
          onClick={() => document.getElementById("imageInput")?.click()}
          className="w-full"
        >
          <LucideImage className="mr-2 h-4 w-4" />
          {totalImages >= effectiveMaxImages
            ? "Limite de imagens atingido"
            : multiple
            ? "Selecionar Imagens"
            : "Selecionar Imagem"}
        </Button>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          multiple={multiple}
          disabled={disabled || totalImages >= effectiveMaxImages}
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
