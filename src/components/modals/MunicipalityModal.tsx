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
import { MaskedInput } from "@/components/ui/masked-input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/ImageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { municipioForm, MunicipioForm } from "@/forms/municipioForm"; 
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

const DEFAULT_FORM_VALUES: MunicipioForm = {
  municipio: {
    nome: "",
    descricao: "",
    site: "",
    mapaUrl: "",
  },
  contato: {
    id: "0",
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
  const form = useForm<MunicipioForm>({ // <-- Usar o tipo 'MunicipioForm'
    resolver: zodResolver(municipioForm), // <-- CONECTAR O ZOD AQUI
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        municipio: {
          id: String(initialData.id),
          nome: initialData.nome,
          descricao: initialData.descricao ?? "",
          site: initialData.site ?? "",
          mapaUrl: initialData.mapaUrl ?? "",
        },
        contato: {
          ...initialData.contato,
          id: String(initialData.contato.id), 
        },
        fotos: initialData.fotos.map(foto => ({
          id: String(foto.id),
          url: foto.url,
        })),
      });
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

  // Função para extrair URL do iframe do Google Maps
  const extractUrlFromIframe = (input: string): string => {
    // Se já é uma URL válida, retorna como está
    if (input.startsWith('http') && !input.includes('<iframe')) {
      return input;
    }
    
    // Regex para extrair o src do iframe
    const srcMatch = input.match(/src="([^"]+)"/i);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    // Se não encontrou o padrão, retorna o input original
    return input;
  };

  // Função para lidar com o paste no campo de mapa
  const handleMapUrlPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const extractedUrl = extractUrlFromIframe(pastedText);
    form.setValue('municipio.mapaUrl', extractedUrl);
    form.trigger('municipio.mapaUrl');
  };

  const handleSubmit = form.handleSubmit(() => {
    const formData = form.getValues();

    const municipioForm: MunicipioForm = {
      municipio: {
        nome: formData.municipio.nome,
        descricao: formData.municipio.descricao ?? "",
        site: formData.municipio.site ?? "",
        mapaUrl: formData.municipio.mapaUrl ?? "",
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

  useEffect(()=> {
    const subscription = form.watch((data, { name }) => {
      if (name) {
        form.trigger(name);
      }
    });
    return () => subscription?.unsubscribe?.();
  }, [form]);

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
                        {...form.register("municipio.nome")}
                        disabled={isViewMode}
                        placeholder="Digite o nome do município"
                        className={form.formState.errors.municipio?.nome ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.municipio?.nome ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.municipio.nome.message}
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
                        {...form.register("municipio.site")}
                        disabled={isViewMode}
                        placeholder="https://www.municipio.gov.br"
                        type="url"
                        className={form.formState.errors.municipio?.site ? "border-red-500" : ""}
                      />
                    </FormControl>
                    {form.formState.errors.municipio?.site ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.municipio.site.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Site oficial da prefeitura (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <TooltipProvider>
                      <div className="flex items-center gap-2">
                        <FormLabel>Mapa URL</FormLabel>
                        <Tooltip>
                          <TooltipTrigger type="button" className="text-blue-500 hover:text-blue-700">
                            <span className="text-sm">ℹ️</span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <div className="space-y-2 text-sm">
                              <p className="font-semibold">Como obter o embed URL do Google Maps:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                <li>Acesse o Google Maps</li>
                                <li>Pesquise pelo município</li>
                                <li>Clique em &quot;Compartilhar&quot;</li>
                                <li>Selecione &quot;Incorporar um mapa&quot;</li>
                                <li>Cole toda a tag &lt;iframe&gt; aqui</li>
                              </ol>
                              <p className="text-xs text-green-600 font-medium">
                                ✨ Pode colar a tag completa! O sistema extrairá a URL automaticamente.
                              </p>
                              <p className="text-xs text-gray-600 italic">
                                Ex: &lt;iframe src=&quot;https://www.google.com/maps/embed?pb=...&quot;&gt;
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                    <FormControl>
                      <Input
                        {...form.register("municipio.mapaUrl")}
                        disabled={isViewMode}
                        placeholder="Cole aqui a tag <iframe> completa do Google Maps ou apenas a URL"
                        type="url"
                        className={form.formState.errors.municipio?.mapaUrl ? "border-red-500" : ""}
                        onPaste={handleMapUrlPaste}
                      />
                    </FormControl>
                    {form.formState.errors.municipio?.mapaUrl ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.municipio.mapaUrl.message}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        💡 Cole a tag &lt;iframe&gt; completa do Google Maps - a URL será extraída automaticamente (opcional)
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
                          {...form.register("municipio.descricao")}
                          disabled={isViewMode}
                          placeholder="Descreva o município de forma atrativa para turistas"
                          className={`min-h-[100px] ${form.formState.errors.municipio?.descricao ? "border-red-500" : ""}`}
                          maxLength={1000}
                          onPaste={(e) => {
                            const paste = e.clipboardData?.getData('text') || '';
                            const currentValue = form.getValues("municipio.descricao") || "";
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
                              form.setValue("municipio.descricao", truncated);
                            }
                          }}
                        />
                        <div className="text-sm text-muted-foreground text-right">
                          {(form.watch("municipio.descricao")?.length || 0)}/1000 caracteres
                        </div>
                      </div>
                    </FormControl>
                    {form.formState.errors.municipio?.descricao ? (
                      <span className="text-red-500 text-xs flex items-center gap-1">
                        <span className="w-4 h-4 text-xs">⚠️</span>
                        {form.formState.errors.municipio.descricao.message}
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
                      <MaskedInput
                        mask="phone"
                        {...form.register("contato.telefone")}
                        disabled={isViewMode}
                        placeholder="(27) 9999-9999"
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
                        💡 Telefone com DDD (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask="phone"
                        {...form.register("contato.celular")}
                        disabled={isViewMode}
                        placeholder="(27) 99999-9999"
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
                        💡 Celular com DDD (opcional)
                      </span>
                    )}
                  </FormItem>
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask="phone"
                        {...form.register("contato.whatsapp")}
                        disabled={isViewMode}
                        placeholder="(27) 99999-9999"
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
                        💡 WhatsApp com DDD (opcional)
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