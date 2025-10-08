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
import { EventoForm } from "@/forms/eventoForm";
import { ImageUpload } from "@/components/ImageUpload";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { useDeleteUpload } from "@/hooks/http/useUpload";
import { useEffect, useState } from "react";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";


interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: EventoFull | null;
  onSave: (eventData: EventoForm & { fotos: File[] }) => void;
}

const defaultValue: EventoForm = {
  evento: {
    nome: "",
    descricao: "",
    data: new Date(),
  },
  endereco: {
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
  },
  municipio: "",
};


function getDefaultValue(data?: EventoFull): EventoForm {
  return {
    evento: {
      id: data?.id || 0,
      nome: data?.nome ?? "",
      descricao: data?.descricao ?? "",
      data: data?.data ? new Date(data.data) : new Date(),
    },
    endereco: {
      logradouro: data?.endereco?.rua || "",
      numero: data?.endereco?.numero || "",
      bairro: data?.endereco?.bairro || "",
      cep: data?.endereco?.cep || "",
    },
    municipio: data?.municipio?.id ? data.municipio.id.toString() : "",
  };
}

export function EventModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: EventModalProps) {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);


  const form = useForm({
    defaultValues: getDefaultValue(initialData as EventoFull) || defaultValue,
  });

  const { data: municipios } = useGetAllMunicipios();
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


  const handleSubmit = () => {
    const formData = form.getValues();
    onSave({
      ...formData, fotos: selectedImages,
    });
  };

  useEffect(() => {
    form.reset(
      initialData ? getDefaultValue(initialData as EventoFull) : defaultValue
    );
  }, [initialData, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Criar Evento"
              : mode === "edit"
              ? "Editar Evento"
              : "Visualizar Evento"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar um novo evento."
              : mode === "edit"
              ? "Modifique os dados do evento."
              : "Visualize os detalhes do evento selecionado."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
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
                        initialFotos={initialData?.fotos?.map((foto) => ({
                          id: foto.foto.url,
                          url: foto.foto.url,
                        }))}
                        onRemoveFoto={handleDeleteFoto}
                        onImagesSelect={handleImageSelect}
                        disabled={isViewMode}
                      />
                  </FormControl>
                </FormItem>
              </section>

              {/* Bloco: Dados do Evento */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados do Evento</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Título
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("evento.nome", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                {/* Textarea ocupa linha propria*/}
                <div>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...form.register("evento.descricao")}
                        disabled={isViewMode}
                        className="textarea w-full min-h-[100px] border rounded-md p-2"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Data do Evento */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Data do Evento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Data</FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        {...form.register("evento.data", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Municipios */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Municipio</h3>
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-sm font-medium">
                    Selecione o Municipio
                  </FormLabel>
                  <FormControl>
                    <select
                      {...form.register("municipio", { required: true })}
                      disabled={isViewMode}
                      className="border rounded-md p-2 w-full"
                    >
                      <option value="">Selecione o município</option>
                      {municipios?.map((municipio) => (
                        <option key={municipio.id} value={municipio.id}>
                          {municipio.nome}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              </section>

              {/* Endereço */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados de Endereço</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Logradouro
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("endereco.logradouro")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.logradouro && (
                      <span className="text-red-500 text-xs">
                        {form.formState.errors.endereco.logradouro.message}
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Número
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("endereco.numero")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.numero && (
                      <span className="text-red-500 text-xs">
                        {form.formState.errors.endereco.numero.message}
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Bairro
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("endereco.bairro")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.bairro && (
                      <span className="text-red-500 text-xs">
                        {form.formState.errors.endereco.bairro.message}
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">CEP</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("endereco.cep")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.cep && (
                      <span className="text-red-500 text-xs">
                        {form.formState.errors.endereco.cep.message}
                      </span>
                    )}
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
