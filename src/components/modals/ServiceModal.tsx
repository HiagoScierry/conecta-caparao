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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
                        initialFotos={initialData?.fotos?.map(galeria => ({
                          id: String(galeria.foto.id),
                          url: galeria.foto.url,
                        })) ?? []}
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
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("servico.nome", { required: true })}
                          disabled={isViewMode}
                          placeholder="Digite o nome do serviço"
                          className={form.formState.errors.servico?.nome ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.servico?.nome ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.servico.nome.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Nome claro que identifique o serviço oferecido
                        </span>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel>Site</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...form.register("servico.site")}
                          disabled={isViewMode}
                          placeholder="https://www.seusite.com.br"
                          className={form.formState.errors.servico?.site ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.servico?.site ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.servico.site.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Site oficial do serviço (opcional)
                        </span>
                      )}
                    </FormItem>
                  </div>

                  <FormItem>
                    <FormLabel>Descrição *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...form.register("servico.descricao", { required: true })}
                        disabled={isViewMode}
                        placeholder="Descreva o serviço oferecido de forma detalhada"
                        className={`min-h-[100px] ${form.formState.errors.servico?.descricao ? "border-red-500" : ""}`}
                      />
                    </FormControl>
                    {form.formState.errors.servico?.descricao ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.servico.descricao.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Inclua detalhes sobre o serviço, diferenciais e o que está incluído
                      </span>
                    )}
                  </FormItem>
                </section>

                {/* Contato */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Contato</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...form.register("contato.email", { required: true })}
                          disabled={isViewMode}
                          placeholder="contato@servico.com"
                          className={form.formState.errors.contato?.email ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.contato?.email ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.contato.email.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Email para contato com clientes
                        </span>
                      )}
                    </FormItem>
                    <FormItem>
                      <FormLabel>Celular *</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.celular", { required: true })}
                          disabled={isViewMode}
                          placeholder="27999999999"
                          className={form.formState.errors.contato?.celular ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.contato?.celular ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.contato.celular.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Apenas números (10-11 dígitos)
                        </span>
                      )}
                    </FormItem>
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.telefone")}
                          disabled={isViewMode}
                          placeholder="27999999999"
                          className={form.formState.errors.contato?.telefone ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.contato?.telefone ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.contato.telefone.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Telefone fixo (opcional)
                        </span>
                      )}
                    </FormItem>
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.whatsapp")}
                          disabled={isViewMode}
                          placeholder="27999999999"
                          className={form.formState.errors.contato?.whatsapp ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.contato?.whatsapp ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.contato.whatsapp.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 WhatsApp para atendimento rápido (opcional)
                        </span>
                      )}
                    </FormItem>
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.instagram")}
                          disabled={isViewMode}
                          placeholder="@usuario_instagram"
                          className={form.formState.errors.contato?.instagram ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.contato?.instagram ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.contato.instagram.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Instagram do serviço (opcional)
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Horário de Funcionamento */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">
                    Horário de Funcionamento
                  </h3>

                  <FormItem>
                    <FormLabel>Dias de Funcionamento *</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-4">
                        {(["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"] as const).map((dia) => (
                          <div key={dia} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dia-${dia}`}
                              checked={form.watch("horarioFuncionamento.diaDaSemana")?.includes(dia) || false}
                              onCheckedChange={(checked) => {
                                const currentDays = form.getValues("horarioFuncionamento.diaDaSemana") || [];
                                if (checked) {
                                  form.setValue("horarioFuncionamento.diaDaSemana", [...currentDays, dia]);
                                } else {
                                  form.setValue("horarioFuncionamento.diaDaSemana", currentDays.filter(d => d !== dia));
                                }
                              }}
                              disabled={isViewMode}
                            />
                            <label
                              htmlFor={`dia-${dia}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {dia.charAt(0) + dia.slice(1).toLowerCase()}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    {form.formState.errors.horarioFuncionamento?.diaDaSemana ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.horarioFuncionamento.diaDaSemana.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Selecione pelo menos um dia de funcionamento
                      </span>
                    )}
                  </FormItem>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormItem>
                      <FormLabel>Horário de Abertura *</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...form.register(
                            "horarioFuncionamento.horaAbertura",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          className={form.formState.errors.horarioFuncionamento?.horaAbertura ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.horarioFuncionamento?.horaAbertura ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.horarioFuncionamento.horaAbertura.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Horário em que o serviço inicia
                        </span>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel>Horário de Fechamento *</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...form.register(
                            "horarioFuncionamento.horaFechamento",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          className={form.formState.errors.horarioFuncionamento?.horaFechamento ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.horarioFuncionamento?.horaFechamento ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.horarioFuncionamento.horaFechamento.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Horário em que o serviço encerra
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Município */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Município</h3>
                  <FormItem>
                    <FormLabel>Selecione o Município *</FormLabel>
                    <FormControl>
                      <Select
                        value={form.watch("municipio")?.toString()}
                        onValueChange={(value) => form.setValue("municipio", value)}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className={form.formState.errors.municipio ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecione o município onde o serviço está localizado" />
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
                        💡 Escolha o município onde o serviço é oferecido
                      </span>
                    )}
                  </FormItem>
                </section>

                {/* Endereço */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Endereço</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem>
                      <FormLabel>CEP *</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("endereco.cep", { required: true })}
                          disabled={isViewMode}
                          placeholder="29000000"
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
                          💡 Apenas números, 8 dígitos
                        </span>
                      )}
                    </FormItem>
                    <FormItem>
                      <FormLabel>Logradouro *</FormLabel>
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
                    <FormItem>
                      <FormLabel>Número *</FormLabel>
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
                    <FormItem>
                      <FormLabel>Bairro *</FormLabel>
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
