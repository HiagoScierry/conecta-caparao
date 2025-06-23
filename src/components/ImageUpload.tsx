import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as LucideImage, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onImagesSelect?: (files: File[]) => void;
  disabled?: boolean;
  maxImages?: number;
}

export function ImageUpload({ onImagesSelect, disabled, maxImages = 5 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    // Limita a quantidade de imagens adicionadas
    const totalFiles = files.length + selectedFiles.length;
    if (totalFiles > maxImages) {
      alert(`Você pode enviar até ${maxImages} imagens.`);
      return;
    }

    // Lê cada arquivo para gerar preview
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...selectedFiles]);
    onImagesSelect?.([...files, ...selectedFiles]);

    // Reseta o input para permitir selecionar os mesmos arquivos depois, se quiser
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onImagesSelect?.(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || files.length >= maxImages}
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
          disabled={disabled || files.length >= maxImages}
        />
      </div>

      {previews.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-2">
            Pode acontecer distorções de imagem nos previews abaixo:
          </p>
          <div className="flex flex-wrap gap-4">
            {previews.map((src, index) => (
              <div key={index} className="relative w-48 h-32 rounded-lg border overflow-hidden">
                <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover" sizes="100%" />
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
        </>
      )}
    </div>
  );
}
