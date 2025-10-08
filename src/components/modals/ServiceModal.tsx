import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { ServicoForm } from "@/forms/servicoForm";
import { ServicoTuristicoFull } from "@/repositories/interfaces/IServicoTuristicoRepository";
import { useDeleteUpload } from "@/hooks/http/useUpload";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: ServicoTuristicoFull;
  onSave: (serviceData: ServicoForm & { fotos: File[] }) => void;
}

const defaultFormValues: ServicoForm = {
  servico: { nome: "", descricao: "", site: "" },
  contato: {
    email: "",
    celular: "",
    telefone: "",
    whatsapp: "",
    instagram: "",
  },
  endereco: { cep: "", logradouro: "", numero: "", bairro: "" },
  municipio: "",
  horarioFuncionamento: {
    diaDaSemana: [],
    horaAbertura: "",
    horaFechamento: "",
  },
};

function getDefaultValues(data?: ServicoTuristicoFull): ServicoForm {
  if (!data) return defaultFormValues;

  const primeiroHorario = data.horarios?.[0]?.horario ?? "";
  const [abertura, fechamento] = primeiroHorario.includes("-")
    ? primeiroHorario.split("-").map((s) => s.trim())
    : ["", ""];

  return {
    servico: {
      id: data.id ?? "",
      nome: data.nome ?? "",
      descricao: data.descricao ?? "",
      site: data.site ?? "",
    },
    horarioFuncionamento: {
      diaDaSemana: data.horarios?.map((h) => h.dia) ?? [],
      horaAbertura: abertura,
      horaFechamento: fechamento,
    },
    endereco: {
      id: data.endereco?.id ?? 0,
      logradouro: data.endereco?.rua ?? "",
      numero: data.endereco?.numero ?? "",
      bairro: data.endereco?.bairro ?? "",
      cep: data.endereco?.cep ?? "",
    },
    contato: {
      id: data.contato?.id?.toString() ?? "",
      email: data.contato?.email ?? "",
      telefone: data.contato?.telefone ?? "",
      celular: data.contato?.celular ?? "",
      whatsapp: data.contato?.whatsapp ?? "",
      instagram: data.contato?.instagram ?? "",
    },
    municipio: data.municipio?.id?.toString() ?? "",
  };
}

export function ServiceModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: ServiceModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const form = useForm<ServicoForm>({
    defaultValues: getDefaultValues(initialData),
  });

  const { data: municipios } = useGetAllMunicipios();

  const { mutateAsync: deleteFoto } = useDeleteUpload();

  const isViewMode = mode === "view";

  // Atualiza valores do formulário sempre que initialData mudar
  useEffect(() => {
    form.reset(getDefaultValues(initialData));
  }, [initialData, form]);

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

  const onSubmit = (data: ServicoForm) => {
    // Pega os erros do formulário
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      // Se houver erros, não prossegue
      console.error("Erros no formulário:", errors);
      return;
    }


    onSave({ ...data, fotos: selectedImages });
    onClose(); // Idealmente, fechar o modal apenas se o onSave for bem-sucedido.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Criar Serviço"
              : mode === "edit"
              ? "Editar Serviço"
              : "Visualizar Serviço"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar um novo serviço."
              : mode === "edit"
              ? "Modifique os dados do serviço."
              : "Visualize os detalhes do serviço selecionado."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Form {...form}>
            <form id="service-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6 py-4">
                {/* Imagem */}
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <ImageUpload
                        initialFotos={[{
                          id: initialData?.foto?.id !== undefined ? String(initialData.foto.id) : "",
                          url: initialData?.foto?.url ?? "",
                        }]}
                        onRemoveFoto={handleDeleteFoto}
                        onImagesSelect={handleImageSelect}
                        disabled={isViewMode}
                        multiple={false}
                      />
                    </FormControl>
                  </FormItem>
                </section>

                {/* Dados do Serviço */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Dados do Serviço</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("servico.nome", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel>Site</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("servico.site")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <textarea
                        {...form.register("servico.descricao")}
                        disabled={isViewMode}
                        className="textarea w-full min-h-[100px] border rounded-md p-2"
                      />
                    </FormControl>
                  </FormItem>
                </section>

                {/* Contato */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Contato</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          {...form.register("contato.email")}
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
                      <FormLabel>Whatsapp</FormLabel>
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

                {/* Horário de Funcionamento */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">
                    Horário de Funcionamento
                  </h3>

                  <FormItem>
                    <FormLabel>Dias de Funcionamento</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-4">
                        {[
                          "SEGUNDA",
                          "TERCA",
                          "QUARTA",
                          "QUINTA",
                          "SEXTA",
                          "SABADO",
                          "DOMINGO",
                        ].map((dia) => (
                          <label key={dia} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              value={dia}
                              {...form.register(
                                "horarioFuncionamento.diaDaSemana"
                              )}
                              disabled={isViewMode}
                            />
                            {dia.charAt(0) + dia.slice(1).toLowerCase()}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormItem>
                      <FormLabel>Horário de Abertura</FormLabel>
                      <FormControl>
                        <input
                          type="time"
                          {...form.register(
                            "horarioFuncionamento.horaAbertura",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel>Horário de Fechamento</FormLabel>
                      <FormControl>
                        <input
                          type="time"
                          {...form.register(
                            "horarioFuncionamento.horaFechamento",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </section>

                {/* Município */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Municípios</h3>
                  <FormItem>
                    <FormLabel>Selecione o Município</FormLabel>
                    <FormControl>
                      <select
                        {...form.register("municipio", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Selecione o município</option>
                        {municipios?.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.nome}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                </section>

                {/* Endereço */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Endereço</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem>
                      <FormLabel>Cep</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.cep")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Logradouro</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.logradouro")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Numero</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.numero")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.bairro")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </section>
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {!isViewMode && (
            <Button
              type="submit"
              className="bg-tourism-primary"
              form="service-form"
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
