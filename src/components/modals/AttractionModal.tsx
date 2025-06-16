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
interface AttractionForm {
  nome: string;
  horarioFuncionamento: string;
  descricao: string;
  categoria: string[];
  perfil: string[];
  municipio: string;
  endereco: Endereco;
  contato: Contato;
}

interface AttractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  initialData?: {
    id: number;
    nome: string;
    horarioFuncionamento: string;
    descricao: string;
    categoria: string[];
    perfil: string[];
    municipio: string;
    endereco?: Endereco;
    contato?: Contato;
  };
}

export function AttractionModal({ isOpen, onClose, mode, initialData }: AttractionModalProps) {
  const form = useForm<AttractionForm>({
    defaultValues: {
      nome: initialData?.nome || '',
      descricao: initialData?.descricao || '',
      categoria: initialData?.categoria || [],
      perfil: initialData?.perfil || [],
      municipio: initialData?.municipio || '',
      endereco: initialData?.endereco && typeof initialData.endereco === 'object' ? initialData.endereco : { cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '' },
      contato: initialData?.contato && typeof initialData.contato === 'object' ? initialData.contato : { email: '', celular: '', telefone: '', whatsapp: '', instagram: '' },
    },
  });

  const isViewMode = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Atração' : mode === 'edit' ? 'Editar Atração' : 'Detalhes da Atração'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Preencha os dados para criar uma nova atração.' : mode === 'edit' ? 'Modifique os dados da atração.' : 'Visualize os detalhes da atração.'}
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
                  { name: 'horarioFuncionamento', label: 'Horário de Funcionamento' },
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
                  {
                    name: 'categoria',
                    label: 'Categoria',
                    component: 'checkbox-group',
                    options: [
                      { id: 'restaurante', label: 'Restaurante' },
                      { id: 'hotel', label: 'Hotel' },
                      { id: 'pub', label: 'Pub' },
                      { id: 'lanchonete', label: 'Lanchonete' },
                      { id: 'cervejaria', label: 'Cervejaria' },
                      { id: 'pousada', label: 'Pousada' },
                      { id: 'cafe', label: 'Café' },
                      { id: 'bar', label: 'Bar' },
                      { id: 'loja', label: 'Loja' },
                    ],
                  },
                  {
                    name: 'perfil',
                    label: 'Perfil do Cliente',
                    component: 'checkbox-group',
                    options: [
                      { id: 'casal', label: 'Casal' },
                      { id: 'grupo', label: 'Grupo' },
                      { id: 'individual', label: 'Individual' },
                      { id: 'pet_friendly', label: 'Pet Friendly' },
                      { id: 'familia', label: 'Família' },
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

              {/* Contato */}
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
            <Button type="submit" className="bg-tourism-primary">
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
