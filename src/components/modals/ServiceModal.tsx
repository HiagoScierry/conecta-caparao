import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServicoForm } from "@/forms/servicoForm";
import { ImageUpload } from "@/components/ImageUpload";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: ServicoForm;
  onSave: (serviceData: ServicoForm) => void;
}

export function ServiceModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: ServiceModalProps) {
  const form = useForm({
    defaultValues: {
      servico: initialData?.servico || {
        id: "",
        nome: "",
        descricao: "",
        site: "",
        horarios: {
          diaDaSemana: "",
          horarioAbertura: "",
          horarioFechamento: "",
        },
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
      municipio: initialData?.municipio || "",
    },
  });

  const { data: municipios } = useGetAllMunicipios();

  const isViewMode = mode === "view";

  const handleImageSelect = (file: File) => {
    console.log("Selected image:", file);
    // Here you would typically handle the image upload to your backend
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData);
    onClose();
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

              {/* Bloco: Dados do Serviço */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados do Serviço</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Nome</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("servico.nome", { required: true })}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Site</FormLabel>
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

                {/* Textarea ocupa linha propria*/}
                <div>
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...form.register("servico.descricao")}
                        disabled={isViewMode}
                        className="textarea w-full min-h-[100px] border rounded-md p-2"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Contato */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Contato</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...form.register("contato.email")}
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
                        type="tel"
                        {...form.register("contato.celular")}
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
                        type="tel"
                        {...form.register("contato.telefone")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">
                      Whatsapp
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

              {/* Bloco: Horário de Funcionamento */}
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
                    {form.formState.errors.horarioFuncionamento
                      ?.diaDaSemana && (
                      <span className="text-red-500 text-xs">
                        {
                          form.formState.errors.horarioFuncionamento.diaDaSemana
                            .message
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
                      <input
                        type="time"
                        {...form.register("horarioFuncionamento.horaAbertura", {
                          required: true,
                        })}
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



              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Municípios</h3>
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-sm font-medium">
                    Selecione o Município
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

              {/* Bloco: Endereço */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Endereço</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-sm font-medium">Cep</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...form.register("endereco.cep")}
                        disabled={isViewMode}
                        className="border rounded-md p-2 w-full"
                      />
                    </FormControl>
                  </FormItem>

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
