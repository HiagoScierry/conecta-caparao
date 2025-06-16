
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
import { renderFormFields } from "@/components/forms/form-helper";

interface Contato {
  email: string;
  celular: string;
  telefone: string;
  whatsapp: string;
  instagram: string;
}
interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  initialData?: {
    id: number;
    nome: string;
    descricao?: string;
    endereco: Endereco;
    contato: Contato;
    site?: string;
  };
  onSave: (serviceData: any) => void;
}

export function ServiceModal({ isOpen, onClose, mode, initialData, onSave }: ServiceModalProps) {
  const form = useForm({
    defaultValues: {
      nome: initialData?.nome || '',
      descricao: initialData?.descricao || '',
      endereco: initialData?.endereco || '',
      contato: initialData?.contato || '',
      site: initialData?.site || '',
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
            {mode === 'create' ? 'Novo Serviço' : mode === 'edit' ? 'Editar Serviço' : 'Detalhes do Serviço'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Preencha os dados para criar um novo serviço.' : mode === 'edit' ? 'Modifique os dados do serviço.' : 'Visualize os detalhes do serviço.'}
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
                  { name: 'nome', label: 'Nome', component: 'input' },
                  { name: 'descricao', label: 'Descrição', component: 'textarea' },
                  { name: 'site', label: 'Site', component: 'input' },
                ],
              })}

              {/*Endereço*/}  
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

              {/*Contato*/}
              <h3 className="text-md font-semibold mt-4 mb-1 col-span-full">Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {renderFormFields({
                  group: 'contato',
                  control: form.control,
                  isViewMode,
                  fields: [
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'celular', label: 'Celular' },
                    { name: 'telefone', label: 'Telefone' },
                    { name: 'whatsapp', label: 'WhatsApp' },
                    { name: 'instagram', label: 'Instagram' },
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
