import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";
import { MunicipioForm } from "@/forms/municipioForm";
import { useState, useEffect } from "react";
import { useDeleteUpload } from "@/hooks/http/useUpload";
import { Contato, Foto, Municipio } from "@prisma/client";

interface MunicipalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: Municipio & { contato: Contato; fotos: Foto[] };
  onSave: (municipalityData: MunicipioForm, urlFotos: File[]) => void;
}

const DEFAULT_FORM_VALUES = {
  id: 0,
  nome: "",
  descricao: "",
  site: "",
  mapaUrl: "",
  contato: {
    id: 0,
    email: "",
    telefone: "",
    celular: "",
    whatsapp: "",
    instagram: "",
  },
  fotos: [],
};

export function MunicipalityModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}: MunicipalityModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const form = useForm<Municipio & { contato: Contato; fotos: Foto[] }>({
    defaultValues: initialData || DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset(DEFAULT_FORM_VALUES);
    }
  }, [initialData, form]);

  const { mutateAsync: deleteFoto } = useDeleteUpload();
  const isViewMode = mode === "view";

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

  const handleSubmit = form.handleSubmit(() => {
    const formData = form.getValues();

    const municipioForm: MunicipioForm = {
      municipio: {
        nome: formData.nome,
        descricao: formData.descricao ?? "",
        site: formData.site ?? "",
        mapaUrl: formData.mapaUrl ?? "",
      },
      contato: {
        id: String(formData.contato.id),
        email: formData.contato.email ?? "",
        telefone: formData.contato.telefone ?? "",
        celular: formData.contato.celular ?? "",
        whatsapp: formData.contato.whatsapp ?? "",
        instagram: formData.contato.instagram ?? "",
      },
    };

    onSave(municipioForm, selectedImages);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Novo Município"
              : mode === "edit"
              ? "Editar Município"
              : "Detalhes do Município"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar um novo município."
              : mode === "edit"
              ? "Modifique os dados do município."
              : "Visualize os detalhes do município."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Upload da imagem */}
              <section className="space-y-2">
                <FormItem>
                  <FormLabel className="text-base font-medium">Imagem</FormLabel>
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

              {/* Bloco: Dados do Município */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados do Município</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Campos do Município */}
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("nome", { required: true })}
                        disabled={isViewMode}
                        placeholder="Digite o nome do município"
                        className={form.formState.errors.nome ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.nome ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.nome.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Nome oficial do município
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("site")}
                        disabled={isViewMode}
                        placeholder="https://www.municipio.gov.br"
                        type="url"
                        className={form.formState.errors.site ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.site ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.site.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Site oficial da prefeitura (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Mapa URL</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("mapaUrl")}
                        disabled={isViewMode}
                        placeholder="https://maps.google.com/..."
                        type="url"
                        className={form.formState.errors.mapaUrl ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.mapaUrl ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.mapaUrl.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Link do Google Maps ou similar (opcional)
                      </span>
                    )}
                  </FormItem>
                </div>

                <div className="col-span-full">
                  <FormItem>
                    <FormLabel>Descrição *</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Textarea
                          {...form.register("descricao", { required: true })}
                          disabled={isViewMode}
                          placeholder="Descreva o município de forma atrativa para turistas"
                          className={`min-h-[100px] ${form.formState.errors.descricao ? "border-red-500" : ""}`}
                          maxLength={1000}
                          onPaste={(e) => {
                            const paste = e.clipboardData?.getData('text') || '';
                            const currentValue = form.getValues("descricao") || "";
                            const target = e.currentTarget;
                            const selectionStart = target.selectionStart ?? currentValue.length;
                            const selectionEnd = target.selectionEnd ?? currentValue.length;
                            const before = currentValue.slice(0, selectionStart);
                            const after = currentValue.slice(selectionEnd);
                            const newValue = before + paste + after;
                            if (newValue.length > 1000) {
                              e.preventDefault();
                              // Truncate so that the pasted text fits within the limit
                              const allowedPasteLength = 1000 - (before.length + after.length);
                              const truncatedPaste = paste.slice(0, Math.max(0, allowedPasteLength));
                              const truncated = before + truncatedPaste + after;
                              form.setValue("descricao", truncated);
                            }
                          }}
                        />
                        <div className="text-sm text-muted-foreground text-right">
                          {(form.watch("descricao")?.length || 0)}/1000 caracteres
                        </div>
                      </div>
                    </FormControl>
                    {form.formState.errors.descricao ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.descricao.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Inclua história, pontos turísticos, cultura e características únicas do município
                      </span>
                    )}
                  </FormItem>
                </div>
              </section>

              {/* Bloco: Dados de Contato */}
              <section className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Dados de Contato</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Campos de Contato */}
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("contato.email", { required: true })}
                        disabled={isViewMode}
                        placeholder="contato@municipio.gov.br"
                        type="email"
                        className={form.formState.errors.contato?.email ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.contato?.email ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.contato.email.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Email oficial para contato com turistas
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("contato.telefone")}
                        disabled={isViewMode}
                        placeholder="27999999999"
                        className={form.formState.errors.contato?.telefone ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.contato?.telefone ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.contato.telefone.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Telefone fixo (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("contato.celular")}
                        disabled={isViewMode}
                        placeholder="27999999999"
                        className={form.formState.errors.contato?.celular ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.contato?.celular ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.contato.celular.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Celular para contato (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("contato.whatsapp")}
                        disabled={isViewMode}
                        placeholder="27999999999"
                        className={form.formState.errors.contato?.whatsapp ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.contato?.whatsapp ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.contato.whatsapp.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 WhatsApp para comunicação rápida (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("contato.instagram")}
                        disabled={isViewMode}
                        placeholder="@usuario_instagram"
                        className={form.formState.errors.contato?.instagram ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.contato?.instagram ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.contato.instagram.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Instagram oficial do município (opcional)
                      </span>
                    )}
                  </FormItem>
                </div>
              </section>

              <div className="hidden">
                <Button type="submit" />
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          {!isViewMode && (
            <Button
              type="button"
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