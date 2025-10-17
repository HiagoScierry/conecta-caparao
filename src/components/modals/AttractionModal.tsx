import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtracaoTuristica,
  Categoria,
  Contato,
  Endereco,
  HorarioDeFuncionamento,
  PerfilCliente,
  Subcategoria,
} from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";

import { AtracaoForm, atracaoTuristicaForm } from "@/forms/atracaoForm";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { usePerfis } from "@/hooks/http/usePerfis";
import { useCategorias } from "@/hooks/http/useCategoria";
import { useDeleteUpload } from "@/hooks/http/useUpload";
import { useSubcategorias } from "@/hooks/http/useSubCategoria";

export type AtracaoTuristicaFull = AtracaoTuristica & {
  horarioFuncionamento: HorarioDeFuncionamento[];
  endereco: Endereco;
  contato: Contato;
  municipio: { id: number; nome: string };
  categoria: Categoria;
  subcategorias: Subcategoria[];
  perfis: PerfilCliente[];
  fotos: { id: number; url: string }[];
};

interface AttractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: AtracaoTuristicaFull | null;
  onSave: (attractionData: AtracaoForm & { fotos: File[] }) => void;
}

const defaultFormValues: AtracaoForm = {
  atracaoTuristica: { nome: "", descricao: "", mapaUrl: "" },
  horarioFuncionamento: {
    diaDaSemana: [],
    horaAbertura: "",
    horaFechamento: "",
  },
  endereco: { logradouro: "", numero: "", bairro: "", cep: "" },
  contato: {
    email: "",
    telefone: "",
    celular: "",
    whatsapp: "",
    instagram: "",
  },
  municipio: "",
  categoria: 0,
  subCategoria: [],
  perfil: [],
};

const getFormValues = (
  data: AtracaoTuristicaFull | null | undefined
): AtracaoForm => {
  if (!data) return defaultFormValues;

  const primeiroHorario = data.horarioFuncionamento?.[0]?.horario ?? "";
  const [abertura, fechamento] = primeiroHorario.includes("-")
    ? primeiroHorario.split("-").map((s: string) => s.trim())
    : ["", ""];

  return {
    atracaoTuristica: {
      id: data.id ?? "",
      nome: data.nome ?? "",
      descricao: data.descricao ?? "",
      mapaUrl: data.mapaUrl ?? "",
    },
    horarioFuncionamento: {
      diaDaSemana: data.horarioFuncionamento?.map((h) => h.dia) ?? [],
      horaAbertura: abertura ?? "",
      horaFechamento: fechamento ?? "",
    },
    endereco: {
      id: data.endereco?.id ?? 0,
      logradouro: data.endereco?.rua ?? "",
      numero: data.endereco?.numero ?? "",
      bairro: data.endereco?.bairro ?? "",
      cep: data.endereco?.cep ?? "",
    },
    contato: {
      id: data.contato?.id ? data.contato.id.toString() : "",
      email: data.contato?.email ?? "",
      telefone: data.contato?.telefone ?? "",
      celular: data.contato?.celular ?? "",
      whatsapp: data.contato?.whatsapp ?? "",
      instagram: data.contato?.instagram ?? "",
    },
    municipio: data.municipio?.id?.toString() ?? "",
    categoria: data.categoria.id ?? 0,
    subCategoria: data.subcategorias?.map((sc) => sc.id) ?? [],
    perfil: data.perfis?.map((p) => p.id.toString()) ?? [],
  };
};

export function AttractionModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: AttractionModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const isViewMode = mode === "view";

  const form = useForm<AtracaoForm>({
    resolver: zodResolver(atracaoTuristicaForm),
    defaultValues: getFormValues(initialData),
  });

  const { data: perfisCliente } = usePerfis();
  const { data: categorias } = useCategorias();
  const { data: subCategorias } = useSubcategorias();
  const { data: municipios } = useGetAllMunicipios();
  const { mutateAsync: deleteFoto } = useDeleteUpload();

  useEffect(() => {
    form.reset(getFormValues(initialData));

    console.log("LOADED ATRACAO MODAL", initialData);
    console.log(form.getValues('categoria'), initialData?.categoria.id);

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

  const onSubmit = (data: AtracaoForm) => {
    console.log(form);

    onSave({ ...data, fotos: selectedImages });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Nova Atração Turística"
              : mode === "edit"
              ? "Editar Atração Turística"
              : "Detalhes da Atração Turística"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os detalhes da nova atração turística."
              : mode === "edit"
              ? "Edite os detalhes da atração turística."
              : "Veja os detalhes da atração turística."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="attraction-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 py-4">
                {/* Imagem */}
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Imagem
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        initialFotos={initialData?.fotos?.map((foto) => ({
                          id: foto.id.toString(),
                          url: foto.url,
                        }))}
                        onRemoveFoto={handleDeleteFoto}
                        onImagesSelect={handleImageSelect}
                        disabled={isViewMode}
                      />
                    </FormControl>
                  </FormItem>
                </section>

                {/* Dados da Atração */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Dados da Atração</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Nome *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("atracaoTuristica.nome", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Digite o nome da atração turística"
                          className={form.formState.errors.atracaoTuristica?.nome ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.nome ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {form.formState.errors.atracaoTuristica.nome.message}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Nome deve ser claro e identificar a atração
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        URL do Mapa *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("atracaoTuristica.mapaUrl", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="https://maps.google.com/..."
                          type="url"
                          className={form.formState.errors.atracaoTuristica?.mapaUrl ? "border-red-500" : ""}
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.mapaUrl ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {
                            form.formState.errors.atracaoTuristica.mapaUrl
                              .message
                          }
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Cole o link do Google Maps ou similar
                        </span>
                      )}
                    </FormItem>
                  </div>

                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Descrição *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...form.register("atracaoTuristica.descricao", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Descreva a atração turística de forma detalhada"
                          className={`min-h-[100px] ${form.formState.errors.atracaoTuristica?.descricao ? "border-red-500" : ""}`}
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.descricao ? (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <span className="w-4 h-4 text-xs">⚠️</span>
                          {
                            form.formState.errors.atracaoTuristica.descricao
                              .message
                          }
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          💡 Inclua informações relevantes como história, características especiais e o que o visitante pode esperar
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Contato */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Dados de Contato</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.email", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="contato@exemplo.com"
                          type="email"
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
                          💡 Email válido para contato com visitantes
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Telefone
                      </FormLabel>
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
                          💡 Apenas números (10-11 dígitos) - opcional
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Celular *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.celular", {
                            required: true,
                          })}
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

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        WhatsApp
                      </FormLabel>
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
                          💡 Apenas números (10-11 dígitos) - opcional
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Instagram
                      </FormLabel>
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
                          💡 Nome do usuário (3-30 caracteres) - opcional
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Municípios */}
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
                          <SelectValue placeholder="Selecione o município onde a atração está localizada" />
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
                        💡 Escolha o município onde sua atração turística está localizada
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
                          {...form.register("endereco.logradouro", {
                            required: true,
                          })}
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
                          💡 Nome completo da rua, avenida ou estrada
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Número *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("endereco.numero", {
                            required: true,
                          })}
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
                          💡 Número do endereço ou S/N se não houver
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Bairro *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("endereco.bairro", {
                            required: true,
                          })}
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
                      <FormLabel className="text-sm font-medium">
                        CEP *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("endereco.cep", {
                            required: true,
                          })}
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
                  </div>
                </section>

                {/* Horário de Funcionamento */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">
                    Horário de Funcionamento
                  </h3>

                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Dias de Funcionamento *
                      </FormLabel>
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Horário de Abertura *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            "horarioFuncionamento.horaAbertura",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          type="time"
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
                          💡 Horário em que a atração abre
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Horário de Fechamento *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            "horarioFuncionamento.horaFechamento",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          type="time"
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
                          💡 Horário em que a atração fecha
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Categoria */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Categoria</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione a Categoria *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={form.watch("categoria")?.toString()}
                        onValueChange={(value) => form.setValue("categoria", parseInt(value))}
                        disabled={isViewMode}
                        className="grid grid-cols-4"
                      >
                        {categorias?.map((categoria: Categoria) => (
                          <div key={categoria.id} className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value={categoria.id.toString()} 
                              id={`categoria-${categoria.id}`}
                            />
                            <label 
                              htmlFor={`categoria-${categoria.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {categoria.id + " " + categoria.nome.charAt(0) +
                                categoria.nome.slice(1).toLowerCase()}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    {form.formState.errors.categoria ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.categoria.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Escolha a categoria que melhor define sua atração
                      </span>
                    )}
                  </FormItem>
                </section>

                {/* SubCategoria */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">SubCategoria</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione as SubCategorias *
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-4">
                        {subCategorias?.map((subCategoria: Subcategoria) => (
                          <div key={subCategoria.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subcategoria-${subCategoria.id}`}
                              checked={form.watch("subCategoria")?.includes(subCategoria.id) || false}
                              onCheckedChange={(checked) => {
                                const currentSubCategorias = form.getValues("subCategoria") || [];
                                if (checked) {
                                  form.setValue("subCategoria", [...currentSubCategorias, subCategoria.id]);
                                } else {
                                  form.setValue("subCategoria", currentSubCategorias.filter(id => id !== subCategoria.id));
                                }
                              }}
                              disabled={isViewMode}
                            />
                            <label
                              htmlFor={`subcategoria-${subCategoria.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subCategoria.nome.charAt(0) +
                                subCategoria.nome.slice(1).toLowerCase()}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    {form.formState.errors.subCategoria ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.subCategoria.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Selecione pelo menos uma subcategoria para detalhar melhor sua atração
                      </span>
                    )}
                  </FormItem>
                </section>

                {/* Perfil */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Perfil do Cliente</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione os Perfis de Cliente
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-4">
                        {perfisCliente?.map((perfil: PerfilCliente) => (
                          <div key={perfil.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`perfil-${perfil.id}`}
                              checked={form.watch("perfil")?.includes(perfil.id.toString()) || false}
                              onCheckedChange={(checked) => {
                                const currentPerfis = form.getValues("perfil") || [];
                                if (checked) {
                                  form.setValue("perfil", [...currentPerfis, perfil.id.toString()]);
                                } else {
                                  form.setValue("perfil", currentPerfis.filter(id => id !== perfil.id.toString()));
                                }
                              }}
                              disabled={isViewMode}
                            />
                            <label
                              htmlFor={`perfil-${perfil.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {perfil.nome}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    {form.formState.errors.perfil ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.perfil.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Selecione os perfis de cliente que mais se adequam à sua atração (opcional)
                      </span>
                    )}
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
