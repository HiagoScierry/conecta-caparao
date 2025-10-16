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
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("atracaoTuristica.nome", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Nome da atração"
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.nome && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.atracaoTuristica.nome.message}
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Mapa URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("atracaoTuristica.mapaUrl", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="URL do mapa"
                          type="url"
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.mapaUrl && (
                        <span className="text-red-500 text-xs">
                          {
                            form.formState.errors.atracaoTuristica.mapaUrl
                              .message
                          }
                        </span>
                      )}
                    </FormItem>
                  </div>

                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...form.register("atracaoTuristica.descricao", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Descrição da atração"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.descricao && (
                        <span className="text-red-500 text-xs">
                          {
                            form.formState.errors.atracaoTuristica.descricao
                              .message
                          }
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
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.email", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Email de contato"
                          type="email"
                        />
                      </FormControl>
                      {form.formState.errors.contato?.email && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.contato.email.message}
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
                          placeholder="(00) 0000-0000"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Celular
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.celular")}
                          disabled={isViewMode}
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                      {form.formState.errors.contato?.celular && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.contato.celular.message}
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
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("contato.instagram", {
                            required: true,
                          })}
                          disabled={isViewMode}
                          placeholder="Instagram"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </section>

                {/* Municípios */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Municípios</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione o Município
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={form.watch("municipio")?.toString()}
                        onValueChange={(value) => form.setValue("municipio", value)}
                        disabled={isViewMode}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o município" />
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
                        <Input
                          {...form.register("endereco.logradouro")}
                          disabled={isViewMode}
                          placeholder="Logradouro"
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
                        <Input
                          {...form.register("endereco.numero")}
                          disabled={isViewMode}
                          placeholder="Número"
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
                        <Input
                          {...form.register("endereco.bairro")}
                          disabled={isViewMode}
                          placeholder="Bairro"
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
                        <Input
                          {...form.register("endereco.cep")}
                          disabled={isViewMode}
                          placeholder="00000-000"
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

                {/* Horário de Funcionamento */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">
                    Horário de Funcionamento
                  </h3>

                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Dias de Funcionamento
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
                      {form.formState.errors.horarioFuncionamento
                        ?.diaDaSemana && (
                        <span className="text-red-500 text-xs">
                          {
                            form.formState.errors.horarioFuncionamento
                              .diaDaSemana.message
                          }
                        </span>
                      )}
                    </FormItem>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Horário de Abertura
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            "horarioFuncionamento.horaAbertura",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          type="time"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Horário de Fechamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            "horarioFuncionamento.horaFechamento",
                            { required: true }
                          )}
                          disabled={isViewMode}
                          type="time"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </section>

                {/* Categoria */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Categoria</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione a Categoria
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
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.categoria?.message}
                    </p>
                  </FormItem>
                </section>

                {/* SubCategoria */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">SubCategoria</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione a SubCategoria
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
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.subCategoria?.message}
                    </p>
                  </FormItem>
                </section>

                {/* Perfil */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Perfil</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione o Perfil
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
