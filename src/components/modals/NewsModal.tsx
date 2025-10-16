import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { NoticiasForm, noticiasForm } from "@/forms/noticiasForm";
import { useEffect, useState } from "react";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";
import { useDeleteUpload } from "@/hooks/http/useUpload";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: NoticiaFull | null;
  onSave: (newsData: NoticiasForm & { fotos: File[] }) => void;
}

const defaultValue = {
  noticia: {
    titulo: "",
    texto: "",
    data: new Date().toISOString().split("T")[0], // string in 'YYYY-MM-DD'
    fotos: [],
    id: undefined,
  },
  fotos: [],
};

const getDefault = (data: NoticiaFull | null | undefined) => {
  if (!data) return defaultValue;
  return {
    noticia: {
      id: data.id,
      titulo: data.titulo,
      texto: data.texto,
      data: new Date(data.data).toISOString().split("T")[0], // string in 'YYYY-MM-DD'
      fotos: data.fotos?.map(foto => ({
        capa: foto.capa,
        id: foto.id,
        url: foto.foto.url,
      })) || [],
    },
    fotos: data.fotos || [],
  };
};
export function NewsModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: NewsModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const form = useForm<NoticiasForm>({
    resolver: zodResolver(noticiasForm),
    defaultValues: getDefault(initialData) ?? defaultValue,
  });

  const isViewMode = mode === "view";

  const { mutateAsync: deleteFoto } = useDeleteUpload();


  const handleDeleteFoto = async (fotoId: string) => {
    try {
      await deleteFoto(fotoId);
    } catch (error) {
      console.error("Erro ao deletar a foto:", error);
    }
  };

  const handleImageSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const onSubmit = (data: NoticiasForm) => {
    onSave({ ...data, fotos: selectedImages });
    onClose();
  };

  useEffect(() => form.reset(getDefault(initialData)), [initialData, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Criar Notícia"
              : mode === "edit"
              ? "Editar Notícia"
              : "Visualizar Notícia"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar uma nova notícia"
              : mode === "edit"
              ? "Edite os dados da notícia"
              : "Visualize os detalhes da notícia selecionada"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="news-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 py-4">
              {/* Bloco: Imagem */}
              <section className="border rounded-lg p-6 space-y-6">
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Imagem
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      initialFotos={initialData?.fotos?.map(f => ({
                        id: String(f.id),
                        url: f.foto.url
                      })) || []}
                      onRemoveFoto={handleDeleteFoto}
                      onImagesSelect={handleImageSelect}
                      disabled={isViewMode}
                    />
                  </FormControl>
                </FormItem>
              </section>

              {/* Bloco: Título */}
              <section className="border rounded-lg p-6 space-y-6">
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("noticia.titulo", { required: true })}
                      disabled={isViewMode}
                      placeholder="Título da notícia"
                    />
                  </FormControl>
                </FormItem>
              </section>

              {/* Bloco: Texto */}
              <section className="border rounded-lg p-6 space-y-6">
                <FormItem>
                  <FormLabel className="text-base font-medium">Texto</FormLabel>
                  <FormControl>
                    <Textarea
                      {...form.register("noticia.texto", { required: true })}
                      disabled={isViewMode}
                      placeholder="Conteúdo da notícia"
                    />
                  </FormControl>
                </FormItem>
              </section>

              {/* Bloco: Data */}
              <section className="border rounded-lg p-6 space-y-6">
                <FormItem>
                  <FormLabel className="text-base font-medium">Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...form.register("noticia.data", { required: true })}
                      disabled={isViewMode}
                    />
                  </FormControl>
                </FormItem>
              </section>
            </div>
            </ScrollArea>

            {/* Footer DENTRO do form para garantir submit */}
            <div className="mt-4 flex items-center justify-end gap-2">
              {!isViewMode && (
                <Button type="submit" className="bg-tourism-primary">
                  {mode === "create" ? "Criar" : "Salvar"}
                </Button>
              )}
              <Button type="button" variant="outline" onClick={onClose}>
                {isViewMode ? "Fechar" : "Cancelar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
