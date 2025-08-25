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
import { useState } from "react";
import { useDeleteUpload } from "@/hooks/http/useUpload";
import { Foto, Municipio } from "@prisma/client";

interface MunicipalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?:  Municipio & { contato: Contato; fotos: Foto[] };
  onSave: (municipalityData: MunicipioForm, urlFotos: File[]) => void;
}

export function MunicipalityModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: MunicipalityModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const form = useForm<MunicipioForm> ({
    defaultValues: {
      municipio: initialData?.municipio || {
        id: "",
        nome: "",
        descricao: "",
        site: "",
        mapaUrl: "",
      },
      contato: initialData?.contato || {
        id: "",
        email: "",
        celular: "",
        telefone: "",
        whatsapp: "",
        instagram: "",
      },
      fotos: initialData?.fotos || [],
    },
  });

  const isViewMode = mode === "view";

  const {mutateAsync: deleteFoto} = useDeleteUpload()

  const handleDeleteFoto = async (fotoId: string) => {
    try {
      await deleteFoto(fotoId);
      // Aqui você pode adicionar lógica para remover a foto da lista exibida, se necessário
    } catch (error) {
      console.error("Erro ao deletar a foto:", error);
    }
  };

  const handleImageSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData, selectedImages);
  };

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
            <div className="space-y-6 py-4">
              {/* Upload da imagem fora dos blocos */}
              <div>
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Imagem
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      initialFotos={initialData?.fotos || []}
                      onRemoveFoto={handleDeleteFoto}
                      onImagesSelect={handleImageSelect}
                      disabled={isViewMode}
                    />
                  </FormControl>
                </FormItem>
              </div>

              {/* Bloco: Dados do Município */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados do Município</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("municipio.nome", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Site
                    </FormLabel>
                    <FormControl>
                      <input
                        type="url"
                        {...form.register("municipio.site")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Mapa URL
                    </FormLabel>
                    <FormControl>
                      <input
                        type="url"
                        {...form.register("municipio.mapaUrl")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                </div>

                {/* Textarea ocupa linha própria */}
                <div>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...form.register("municipio.descricao")}
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
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...form.register("contato.email", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.telefone")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Celular
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.celular")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      WhatsApp
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("contato.whatsapp")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Instagram
                    </FormLabel>
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
