
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { NoticiasForm } from "@/forms/noticiasForm";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: NoticiasForm;
  onSave: (newsData: NoticiasForm) => void;
}

export function NewsModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: NewsModalProps) {
  const form = useForm<NoticiasForm>({
    defaultValues: {
      noticia: initialData?.noticia || {
        titulo: "",
        texto: "",
        data: new Date(),
        fotos: [],
      },
    },
  });

  const isViewMode = mode === "view";

  const handleImageSelect = (file: File) => {
    console.log("Selected image:", file);
    // Here you would typically handle the image upload to your backend
  };


  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData);
    onClose();
  };

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

        <ScrollArea className="h-[60vh]">
          <Form {...form}>
            <div className="space-y-6 py-4">

              {/* Bloco: Imagem */}
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Imagem
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        onImageSelect={handleImageSelect}
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

              { /* Bloco: Texto */ }
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Texto
                    </FormLabel>
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
                    <FormLabel className="text-base font-medium">
                      Data
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...form.register("noticia.data", { required: true })}
                        disabled={isViewMode}
                      />
                    </FormControl>
                  </FormItem>
                </section>

                {/* Bloco: autor */}
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Autor
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("noticia.autor", { required: true })}
                        disabled={isViewMode}
                        placeholder="Nome do autor"
                      />
                    </FormControl>
                  </FormItem>
                  
                </section>
            </div>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {!isViewMode && (
            <Button
              type="submit"
              className="bg-tourism-primary"
              onClick={handleSubmit}
            >
              {mode === "create" ? "Criar" : "Salvar"}
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            {isViewMode ? "Fechar" : "Cancelar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}