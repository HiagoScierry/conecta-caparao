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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
  descricao: string;
  categoria: string;
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
    descricao: string;
    categoria: string;
    perfil: string[];
    municipio: string;
    endereco?: Endereco;
    contato?: Contato;
  };
}

type Option = {
  id: string;
  label: string;
}
type RenderFieldWithOptions = {
  name: string;
  label: string;
  type?: string;
  component?: 'input' | 'textarea' | 'select' | 'checkbox-group';
  options?: Option[];
};

function renderFormFields({ 
  group, 
  fields, 
  control, 
  isViewMode 
}: { 
  group: string | null; 
  fields: RenderFieldWithOptions[]; 
  control: any; 
  isViewMode: boolean 
}) {
  return fields.map(({ name, label, type, component, options }) => {
    const fieldName = group ? `${group}.${name}` : name;

    return (
      <FormField
        key={fieldName} 
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {(() => {
                
                switch (component) {
                  case 'checkbox-group':
                    return (
                    // Um container para o nosso grupo de checkboxes
                    <div className="space-y-2 rounded-md border p-4">
                      {/* Aqui, em vez de um único FormField para o grupo, 
                        vamos renderizar um para cada OPÇÃO de checkbox.
                        Isso é um padrão recomendado pelo react-hook-form para ter controle fino.
                      */}
                      {options?.map((option) => (
                        <FormField
                          key={option.id}
                          control={control}
                          name={fieldName} // O nome é o mesmo para todos, pois eles controlam o mesmo array no formulário
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    // 1. O checkbox está MARCADO se o seu 'id' está INCLUÍDO no array de valores
                                    checked={field.value?.includes(option.id)}
                                    // 2. A MÁGICA ACONTECE AQUI:
                                    onCheckedChange={(checked) => {
                                      // Quando um checkbox muda...
                                      if (checked) {
                                        // Se foi MARCADO, nós chamamos o onChange do formulário com um NOVO ARRAY
                                        // que contém todos os valores antigos MAIS o id do item clicado.
                                        field.onChange([...(field.value || []), option.id]);
                                      } else {
                                        // Se foi DESMARCADO, nós chamamos o onChange do formulário com um NOVO ARRAY
                                        // que FILTRA para remover o id do item clicado.
                                        field.onChange(
                                          (field.value || []).filter(
                                            (value: string) => value !== option.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  );

                  case 'select':
                    return (
                      <Select
                        onValueChange={field.onChange} 
                        defaultValue={field.value}     
                        disabled={isViewMode}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Selecione um(a) ${label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {options?.map(option => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case 'textarea':
                    return <Textarea {...field} disabled={isViewMode} />;

                  default:
                    return <Input type={type || 'text'} {...field} disabled={isViewMode} />;
                }
              })()}
            </FormControl>
          </FormItem>
        )}
      />
    );
  });
}

export function AttractionModal({ isOpen, onClose, mode, initialData }: AttractionModalProps) {
  const form = useForm<AttractionForm>({
    defaultValues: {
      nome: initialData?.nome || '',
      descricao: initialData?.descricao || '',
      categoria: initialData?.categoria || '',
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
                ],
              })}

              {/* Municipio */}
              {renderFormFields({
                group: null,
                control: form.control,
                isViewMode,
                fields: [
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

              {/* Perfil Cliente */}

              {renderFormFields({
                group: null,
                control: form.control,
                isViewMode,
                fields: [
                  {
                    name: 'perfil',
                    label: 'Perfil do Cliente',
                    component: 'checkbox-group',
                    options: [
                      { id: 'individual', label: 'Individual' },
                      { id: 'empresa', label: 'Empresa' },
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
