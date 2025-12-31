import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "@/components/ui/masked-input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventoForm, eventoForm } from "@/forms/eventoForm";
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
    data: new Date().toISOString().split('T')[0],
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
      data: data?.data ? new Date(data.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
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


  const form = useForm<EventoForm>({
    resolver: zodResolver(eventoForm),
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


  const onSubmit = (data: EventoForm) => {
    onSave({ ...data, fotos: selectedImages });
    onClose();
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

        <Form {...form}>
          <form
            id="event-form"
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
                      Título *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("evento.nome", { required: true })}
                        disabled={isViewMode}
                        placeholder="Digite o nome do evento"
                        className={form.formState.errors.evento?.nome ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.evento?.nome ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.evento.nome.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Nome claro e atrativo para o evento
                      </span>
                    )}
                  </FormItem>
                </div>
                {/* Textarea ocupa linha propria*/}
                <div>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={form.watch("evento.descricao")}
                        onChange={(value) => form.setValue("evento.descricao", value)}
                        disabled={isViewMode}
                        placeholder="Descreva o evento de forma detalhada"
                        className={form.formState.errors.evento?.descricao ? "border-red-500" : ""}
                        minHeight="150px"
                      />
                    </FormControl>
                    {form.formState.errors.evento?.descricao ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.evento.descricao.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Inclua informações como programação, atrações e o que esperar do evento
                      </span>
                    )}
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Data do Evento */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Data do Evento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Data *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...form.register("evento.data", { required: true })}
                        disabled={isViewMode}
                        className={form.formState.errors.evento?.data ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.evento?.data ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.evento.data.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Selecione a data em que o evento acontecerá
                      </span>
                    )}
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Municipios */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Município</h3>
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-sm font-medium">
                    Selecione o Município *
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={form.watch("municipio")?.toString()}
                      onValueChange={(value) => form.setValue("municipio", value)}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className={form.formState.errors.municipio ? "border-red-500" : ""}>
                        <SelectValue placeholder="Selecione o município onde o evento acontecerá" />
                      </SelectTrigger>
                      <SelectContent>
                        {municipios?.map((municipio) => (
                          <SelectItem key={municipio.id} value={municipio.id.toString()}>
                            {municipio.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.municipio ? (
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      <span className="w-4 h-4 text-xs">⚠️</span>
                      {form.formState.errors.municipio.message}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">
                      💡 Escolha o município onde o evento será realizado
                    </span>
                  )}
                </FormItem>
              </section>

              {/* Endereço */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados de Endereço</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Logradouro *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("endereco.logradouro", { required: true })}
                        disabled={isViewMode}
                        placeholder="Rua, Avenida, Estrada..."
                        className={form.formState.errors.endereco?.logradouro ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.logradouro ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.endereco.logradouro.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Nome completo da rua, avenida ou local
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Número *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("endereco.numero", { required: true })}
                        disabled={isViewMode}
                        placeholder="123 ou S/N"
                        className={form.formState.errors.endereco?.numero ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.numero ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.endereco.numero.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Número do local ou S/N se não houver
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Bairro *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("endereco.bairro", { required: true })}
                        disabled={isViewMode}
                        placeholder="Nome do bairro"
                        className={form.formState.errors.endereco?.bairro ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.bairro ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.endereco.bairro.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Nome do bairro ou região
                      </span>
                    )}
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">CEP *</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask="cep"
                        {...form.register("endereco.cep", { required: true })}
                        disabled={isViewMode}
                        placeholder="29000-000"
                        className={form.formState.errors.endereco?.cep ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.endereco?.cep ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.endereco.cep.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 CEP no formato 00000-000
                      </span>
                    )}
                  </FormItem>
                </div>
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
