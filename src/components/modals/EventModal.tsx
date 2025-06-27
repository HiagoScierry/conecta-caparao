
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { EventoForm } from "@/forms/eventoForm";
import { ImageUpload } from "@/components/ImageUpload";

const municipiosMock = [
  { id: "1", nome: "São Paulo" },
  { id: "2", nome: "Rio de Janeiro" },
  { id: "3", nome: "Belo Horizonte" },
  { id: "4", nome: "Curitiba" },
  { id: "5", nome: "Porto Alegre" },
]

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: EventoForm;
  onSave: (eventData: EventoForm) => void;
}

export function EventModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: EventModalProps) {
  const form = useForm({
    defaultValues: {
      evento: initialData?.evento || {
        id: "",
        nome: "",
        descricao: "",
        data: "",
        fotos: {
          url: "",
          capa: false,
        },
      },
      municipio: initialData?.municipio || {
        id: "",
        nome: "",
      },
    },
  });

  const isViewMode = mode === "view";

  const handleImageSelect = (file: File) => {
    console.log("Selected image:", file);
    // Here you would typically handle the image upload to your backend
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData);
  };

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
                        onImageSelect={handleImageSelect}
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
                      <FormLabel className="text-sm font-medium">
                        Data
                      </FormLabel>
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