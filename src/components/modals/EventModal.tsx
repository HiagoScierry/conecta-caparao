
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
import { renderFormFields } from "@/components/forms/form-helper";

interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  initialData?: {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    municipio: string;
    endereco: Endereco;
  };
  onSave: (eventData: any) => void;
}

export function EventModal({ isOpen, onClose, mode, initialData, onSave }: EventModalProps) {
  const form = useForm({
    defaultValues: {
      nome: initialData?.nome || '',
      descricao: initialData?.descricao || '',
      data: initialData?.data || '',
      municipio: initialData?.municipio || '',
      endereco: initialData?.endereco || '',
    },
  });

  const isViewMode = mode === 'view';

  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Evento' : mode === 'edit' ? 'Editar Evento' : 'Detalhes do Evento'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Preencha os dados para criar um novo evento.' : mode === 'edit' ? 'Modifique os dados do evento.' : 'Visualize os detalhes do evento.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Form {...form}>
            <div className="grid gap-4 py-4">
              
              {renderFormFields({
                group: null,
                control: form.control,
                isViewMode,
                fields: [
                  { name: 'nome', label: 'Nome' },
                  { name: 'descricao', label: 'Descrição', component: 'textarea' },
                  { name: 'data', label: 'Data', type: 'date' },
                  { name: 'municipio',
                    label: 'Município',
                    component: 'select',
                    options: [
                      { id: 'ibatiba', label: 'Ibatiba' },
                      { id: 'irupi', label: 'Irupi' },
                      { id: 'iuna', label: 'Iúna' },
                      { id: 'ibitirama', label: 'Ibitirama' },
                      { id: 'muniz_freire', label: 'Muniz Freire' },
                      { id: 'divino_de_sao_lourenco', label: 'Divino de São Lourenço' },
                      { id: 'dores_do_rio_preto', label: 'Dores do Rio Preto' },
                      { id: 'guacui', label: 'Guaçuí' },
                      { id: 'alegre', label: 'Alegre' },
                      { id: 'sao_jose_do_calcado', label: 'São José do Calçado' },
                      { id: 'bom_jesus_do_norte', label: 'Bom Jesus do Norte' },
                    ],
                  },
                ],
              })}

              {/* Endereço */}
              <h3 className="text-md font-semibold mt-2 mb-1 col-span-full">Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {renderFormFields({
                  group: 'endereco',
                  control: form.control,
                  isViewMode,
                  fields: [
                    { name: 'cep', label: 'CEP' },
                    { name: 'logradouro', label: 'Logradouro' },
                    { name: 'numero', label: 'Número' },
                    { name: 'bairro', label: 'Bairro' },
                    { name: 'cidade', label: 'Cidade' },
                    { name: 'estado', label: 'Estado' },
                  ],
                })}
              </div>
              
            </div>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {!isViewMode && (
            <Button type="submit" className="bg-tourism-primary" onClick={handleSubmit}>
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            {isViewMode ? 'Fechar' : 'Cancelar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
