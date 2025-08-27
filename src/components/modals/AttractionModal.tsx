import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categoria, PerfilCliente } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";

import { AtracaoForm, atracaoTuristicaForm } from "@/forms/atracaoForm";
import { AtracaoTuristicaFull } from "@/repositories/interfaces/IAtracaoTuristicaRepository";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { usePerfis } from "@/hooks/http/usePerfis";
import { useCategorias } from "@/hooks/http/useCategoria";
import { useDeleteUpload } from "@/hooks/http/useUpload";

// Interface das Props (sem alterações)
interface AttractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: AtracaoTuristicaFull | null;
  onSave: (attractionData: AtracaoForm & { fotos: File[] }) => void;
}

// Valores padrão para o formulário em modo de criação (sem alterações)
const defaultFormValues: AtracaoForm = {
  atracaoTuristica: { nome: "", descricao: "", mapaUrl: "" },
  horarioFuncionamento: { diaDaSemana: [], horaAbertura: "", horaFechamento: "" },
  endereco: { logradouro: "", numero: "", bairro: "", cidade: "", estado: "", cep: "" },
  contato: { email: "", telefone: "", celular: "", whatsapp: "", instagram: "" },
  municipio: "",
  categoria: 0,
  perfil: [],
};

// **NOVO: Função auxiliar para transformar initialData no formato do formulário**
// Isso centraliza a lógica de mapeamento e torna o código mais limpo.
const getFormValues = (data: AtracaoTuristicaFull | null | undefined): AtracaoForm => {
  if (!data) {
    return defaultFormValues;
  }

  // Mapeia os dados recebidos para a estrutura esperada pelo formulário.
  return {
    atracaoTuristica: {
      nome: data.nome ?? defaultFormValues.atracaoTuristica.nome,
      descricao: data.descricao ?? defaultFormValues.atracaoTuristica.descricao,
      mapaUrl: data.mapaUrl ?? defaultFormValues.atracaoTuristica.mapaUrl,
    },
    horarioFuncionamento: {
      diaDaSemana: data.horarios.map(h => h.dia) ?? defaultFormValues.horarioFuncionamento.diaDaSemana,
      horaAbertura: data.horarios[0].horario.split("-")[0].trim() ?? defaultFormValues.horarioFuncionamento.horaAbertura,
      horaFechamento: data.horarios[0].horario.split("-")[1].trim() ?? defaultFormValues.horarioFuncionamento.horaFechamento,
    },
    endereco:{
      logradouro: data.endereco?.rua ?? defaultFormValues.endereco.logradouro,
      numero: data.endereco?.numero ?? defaultFormValues.endereco.numero,
      bairro: data.endereco?.bairro ?? defaultFormValues.endereco.bairro,
      cidade: data.endereco?.cidade ?? defaultFormValues.endereco.cidade,
      estado: data.endereco?.estado ?? defaultFormValues.endereco.estado,
      cep: data.endereco?.cep ?? defaultFormValues.endereco.cep,
    },
    contato: {
      email: data.contato?.email ?? defaultFormValues.contato.email,
      telefone: data.contato?.telefone ?? defaultFormValues.contato.telefone,
      celular: data.contato?.celular ?? defaultFormValues.contato.celular,
      whatsapp: data.contato?.whatsapp ?? defaultFormValues.contato.whatsapp,
      instagram: data.contato?.instagram ?? defaultFormValues.contato.instagram,
    },
    municipio: data.municipio?.id.toString() ?? "",
    categoria: data.categoria?.id ?? "",
    perfil: data.perfis.map(p => p.id.toString()) ?? [],
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
  const { data: municipios } = useGetAllMunicipios();
  const { mutateAsync: deleteFoto } = useDeleteUpload();

  useEffect(() => {
    form.reset(getFormValues(initialData));
  }, [initialData, form]);

  const handleDeleteFoto = async (fotoId: string) => {
    try {
      await deleteFoto(fotoId);
      // Lógica para atualizar a UI após deletar a foto
    } catch (error) {
      console.error("Erro ao deletar a foto:", error);
    }
  };

  const handleImageSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const onSubmit = (data: AtracaoForm) => {
    onSave({ ...data, fotos: selectedImages });
    onClose(); // Idealmente, fechar o modal apenas se o onSave for bem-sucedido.
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

        <ScrollArea className="h-[60vh]">
          <Form {...form}>
            <form id="attraction-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <div className="space-y-6 py-4">

                {/* Bloco: Imagem */}
                <section className="border rounded-lg p-6 space-y-6">
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Imagem
                    </FormLabel>
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

                {/* Bloco: Dados da Atração */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Dados da Atração</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("atracaoTuristica.nome", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
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
                        <input
                          type="url"
                          {...form.register("atracaoTuristica.mapaUrl", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.mapaUrl && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.atracaoTuristica.mapaUrl.message}
                        </span>
                      )}
                    </FormItem>
                  </div>

                  {/* Textarea ocupa linha propria */}
                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...form.register("atracaoTuristica.descricao", { required: true })}
                          disabled={isViewMode}
                          className="textarea w-full min-h-[100px] border rounded-md p-2"
                        />
                      </FormControl>
                      {form.formState.errors.atracaoTuristica?.descricao && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.atracaoTuristica.descricao.message}
                        </span>
                      )}
                    </FormItem>
                  </div>
                </section>

                {/* Bloco: Horario de Funcionamento */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Horário de Funcionamento</h3>

                  { /* Checkbox para dias da semana ocupando linha propria*/}
                  <div>
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Dias de Funcionamento
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-4">
                          {["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"].map((dia) => (
                            <label key={dia} className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                value={dia}
                                {...form.register("horarioFuncionamento.diaDaSemana")}
                                disabled={isViewMode}
                              />
                              {dia.charAt(0) + dia.slice(1).toLowerCase()}
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      {form.formState.errors.horarioFuncionamento?.diaDaSemana && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.horarioFuncionamento.diaDaSemana.message}
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
                        <input
                          type="time"
                          {...form.register("horarioFuncionamento.horaAbertura", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Horário de Fechamento
                      </FormLabel>
                      <FormControl>
                        <input
                          type="time"
                          {...form.register("horarioFuncionamento.horaFechamento", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </section>

                {/* Bloco: Municipios */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Municipios</h3>
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

                {/* Bloco: Categoria */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Categoria</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione as Categoria
                    </FormLabel>
                    <FormControl>
                        <div className="grid grid-cols-4">
                          {categorias?.map((categoria: Categoria) => (
                            <label key={categoria.id} className="flex items-center gap-1">
                              <input
                                type="radio"
                                value={categoria.id}
                                checked={form.getValues("categoria")?.toString() === categoria.id.toString()}
                                {...form.register("categoria")}
                                disabled={isViewMode}
                              />
                              {categoria.nome.charAt(0) + categoria.nome.slice(1).toLowerCase()}
                            </label>
                          ))}
                        </div>
                    </FormControl>
                      {form.formState.errors.categoria?.nome && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.categoria.nome.message}
                        </span>
                      )}
                  </FormItem>
                </section>

                {/* Bloco: Perfil */}
                <section className="border rounded-lg p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Perfil</h3>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Selecione o Perfil
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-4">
                        {perfisCliente?.map((perfil: PerfilCliente) => (
                          <label key={perfil.id} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              value={perfil.id}
                              {...form.register("perfil")}
                              disabled={isViewMode}
                            />
                            {perfil.nome}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                        {form.formState.errors.perfil?.tipo && (
                          <span className="text-red-500 text-xs">
                            {form.formState.errors.perfil.tipo.message}
                          </span>
                        )}
                  </FormItem>
                </section>

                {/* Bloco: Dados de Endereço */}
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
                      <FormLabel className="text-sm font-medium">
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.cidade")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                      {form.formState.errors.endereco?.cidade && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.endereco.cidade.message}
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Estado
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.estado")}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                      {form.formState.errors.endereco?.estado && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.endereco.estado.message}
                        </span>
                      )}
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        CEP
                      </FormLabel>
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
                        <input
                          type="text"
                          {...form.register("contato.telefone", { required: true })}
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
                          {...form.register("contato.celular", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
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
                        <input
                          type="text"
                          {...form.register("contato.whatsapp", { required: true })}
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
                          {...form.register("contato.instagram", { required: true })}
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
              form="attraction-form"
              className="bg-tourism-primary"
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
