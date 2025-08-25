import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";
import { MunicipioForm } from "@/forms/municipioForm";
import { useState, useEffect } from "react";
import { useDeleteUpload } from "@/hooks/http/useUpload";
import { Contato, Foto, Municipio } from "@prisma/client";

interface MunicipalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: Municipio & { contato: Contato; fotos: Foto[] };
  onSave: (municipalityData: MunicipioForm, urlFotos: File[]) => void;
}

const DEFAULT_FORM_VALUES = {
  id: 0,
  nome: "",
  descricao: "",
  site: "",
  mapaUrl: "",
  contato: {
    id: 0,
    email: "",
    telefone: "",
    celular: "",
    whatsapp: "",
    instagram: "",
  },
  fotos: [],
};

export function MunicipalityModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: MunicipalityModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const form = useForm<Municipio & { contato: Contato; fotos: Foto[] }>({
    defaultValues: initialData || DEFAULT_FORM_VALUES,
  });

  // Reseta o formulário quando a modal é aberta com novos dados
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset(DEFAULT_FORM_VALUES);
    }
  }, [initialData, form]);

  const { mutateAsync: deleteFoto } = useDeleteUpload();
  const isViewMode = mode === "view";

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

  const handleSubmit = form.handleSubmit(() => {
    const formData = form.getValues();

    const municipioForm: MunicipioForm = {
      municipio: {
        nome: formData.nome,
        descricao: formData.descricao ?? "",
        site: formData.site ?? "",
        mapaUrl: formData.mapaUrl ?? "",
      },
      contato: {
        id: String(formData.contato.id),
        email: formData.contato.email ?? "",
        telefone: formData.contato.telefone ?? "",
        celular: formData.contato.celular ?? "",
        whatsapp: formData.contato.whatsapp ?? "",
        instagram: formData.contato.instagram ?? "",
      },
    };

    onSave(municipioForm, selectedImages);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Novo Município"
              : mode === "edit"
              ? "Editar Município"
              : "Detalhes do Município"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar um novo município."
              : mode === "edit"
              ? "Modifique os dados do município."
              : "Visualize os detalhes do município."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Upload da imagem */}
              <section className="space-y-2">
                <FormItem>
                  <FormLabel className="text-base font-medium">Imagem</FormLabel>
                  <FormControl>
                    <ImageUpload
                      initialFotos={
                        initialData?.fotos?.map((foto) => ({
                          id: foto.id.toString(),
                          url: foto.url,
                        }))
                      }
                      onRemoveFoto={handleDeleteFoto}
                      onImagesSelect={handleImageSelect}
                      disabled={isViewMode}
                    />
                  </FormControl>
                </FormItem>
              </section>

              {/* Bloco: Dados do Município */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados do Município</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Campos do Município */}
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("nome", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <input
                        type="url"
                        {...form.register("site")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Mapa URL</FormLabel>
                    <FormControl>
                      <input
                        type="url"
                        {...form.register("mapaUrl")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="col-span-full">
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <textarea
                        {...form.register("descricao")}
                        disabled={isViewMode}
                        className="textarea w-full min-h-[100px] border rounded-md p-2"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Dados de Contato */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados de Contato</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Campos de Contato */}
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...form.register("contato.email", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.telefone")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.celular")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.whatsapp")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.instagram")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </section>

              <div className="hidden">
                <Button type="submit" />
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {!isViewMode && (
            <Button
              type="button"
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