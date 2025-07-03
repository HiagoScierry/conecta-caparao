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
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";
import { AtracaoForm, atracaoTuristicaForm } from "@/forms/atracaoForm";
import { zodResolver } from "@hookform/resolvers/zod";

const municipiosMock = [
  { id: "1", nome: "Sao Paulo" },
  { id: "2", nome: "Rio de Janeiro" },
  { id: "3", nome: "Belo Horizonte" },
  { id: "4", nome: "Curitiba" },
  { id: "5", nome: "Porto Alegre" },
]

const categoriasMock = [
  { id: "1", tipo: "Cultural" },
  { id: "2", tipo: "Natural" },
  { id: "3", tipo: "Histórica" },
]

const perfilClienteMock = [
  { id: "1", tipo: "individual" },
  { id: "2", tipo: "casal" },
  { id: "3", tipo: "familia" },
  { id: "4", tipo: "grupo" },
  { id: "5", tipo: "pet friendly" },
]

interface AttractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: AtracaoForm;
  onSave: (attractionData: AtracaoForm) => void;
}

export function AttractionModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: AttractionModalProps) {
  const form = useForm({
    resolver: zodResolver(atracaoTuristicaForm),
    defaultValues: {
      atracaoTuristica: initialData?.atracaoTuristica || {
        id: "",
        nome: "",
        descricao: "",
        mapaUrl: "",
        site: "",
      },
      contato: initialData?.contato || {
        id: "",
        email: "",
        celular: "",
        telefone: "",
        whatsapp: "",
        instagram: "",
      },
      endereco: initialData?.endereco || {
        id: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      municipio: initialData?.municipio || {
        id: "",
        nome: "",
      },
      horarioFuncionamento: initialData?.horarioFuncionamento || {
        id: "",
        diaDaSemana: [],
        horaAbertura: "",
        horaFechamento: "",
      },
      categoria: initialData?.categoria || {
        id: "",
        tipo: [],
      },
      perfil: initialData?.perfil || {
        id: "",
        tipo: [],
      },
    }
  });

  const isViewMode = mode === "view";

  const handleImageSelect = (file: File) => {
    console.log("Selected image:", file);
    // Here you would typically handle the image upload to your backend
  };
  const onSubmit = (data: AtracaoForm) => {
    console.log("Formulario válido! Enviando dados:", data);
    onSave(data);
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
                        onImageSelect={handleImageSelect}
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
                        {...form.register("municipio.id", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Selecione o município</option>
                        {municipiosMock.map((municipio) => (
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
                        <div className="flex flex-wrap gap-4">
                          {["Cultural", "Natural", "Histórica"].map((categoria) => (
                            <label key={categoria} className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                value={categoria}
                                {...form.register("categoria.tipo")}
                                disabled={isViewMode}
                              />
                              {categoria.charAt(0) + categoria.slice(1).toLowerCase()}
                            </label>
                          ))}
                        </div>
                    </FormControl>
                      {form.formState.errors.categoria?.tipo && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.categoria.tipo.message}
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
                      <div className="flex flex-wrap gap-4">
                        {perfilClienteMock.map((perfil) => (
                          <label key={perfil.id} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              value={perfil.tipo}
                              {...form.register("perfil.tipo")}
                              disabled={isViewMode}
                            />
                            {perfil.tipo}
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
                          {...form.register("endereco.logradouro", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Número
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.numero", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.bairro", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.cidade", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        Estado
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.estado", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        CEP
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...form.register("endereco.cep", { required: true })}
                          disabled={isViewMode}
                          className="border rounded-md p-2 w-full"
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
    