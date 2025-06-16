
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
import { ImageUpload } from "@/components/ImageUpload";
import { renderFormFields } from "../forms/form-helper";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  initialData?: {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    autor: string;
  };
  onSave: (newsData: any) => void;
}

export function NewsModal({ isOpen, onClose, mode, initialData, onSave }: NewsModalProps) {
  const form = useForm({
    defaultValues: {
      titulo: initialData?.titulo || '',
      texto: initialData?.texto || '',
      data: initialData?.data || '',
      autor: initialData?.autor || '',
    },
  });

  const isViewMode = mode === 'view';

  const handleImageSelect = (file: File) => {
    console.log('Selected image:', file);
    // Here you would typically handle the image upload to your backend
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Notícia' : mode === 'edit' ? 'Editar Notícia' : 'Detalhes da Notícia'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' ? 'Preencha os dados para criar uma nova notícia.' : mode === 'edit' ? 'Modifique os dados da notícia.' : 'Visualize os detalhes da notícia.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Form {...form}>
            <div className="grid gap-4 py-4">
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    disabled={isViewMode}
                  />
                </FormControl>
              </FormItem>

              {renderFormFields({
                group: null,
                control: form.control,
                isViewMode,
                fields: [
                  { name: 'titulo', label: 'Título' },
                  { name: 'texto', label: 'Texto', component: 'textarea' },
                  { name: 'data', label: 'Data', type: 'date' },
                  { name: 'autor', label: 'Autor' },
                ],
              })}
              
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
