
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as LucideImage } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onImageSelect?: (file: File) => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageSelect, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect?.(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => document.getElementById('imageInput')?.click()}
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
          disabled={disabled}
        />
      </div>
      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
          />
        </div>
      )}
    </div>
  );
}
