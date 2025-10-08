"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { NewsModal } from "@/components/modals/NewsModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateNoticia,
  useDeleteNoticia,
  useGetNoticias,
  useUpdateNoticia,
} from "@/hooks/http/useNoticia";
import { NoticiasForm } from "@/forms/noticiasForm";
import { useUpload } from "@/hooks/http/useUpload";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";

export default function Noticias() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedNews, setSelectedNews] = useState<NoticiaFull | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NoticiaFull | null>(null);

  const { data: noticias } = useGetNoticias();

  const { mutateAsync: uploadFile } = useUpload();
  const { mutateAsync: createNoticia } = useCreateNoticia();
  const { mutateAsync: updateNoticia } = useUpdateNoticia();
  const { mutateAsync: deleteNoticia } = useDeleteNoticia();

  const handleOpenModal = (mode: "create" | "edit" | "view", news?: NoticiaFull) => {
    setModalMode(mode);
    setSelectedNews(news || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (news: NoticiaFull) => {
    setNewsToDelete(news);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteNews = async () => {
    if (newsToDelete) {
      await deleteNoticia(newsToDelete.id);

      toast({
        title: "Notícia excluída",
        description: `A notícia "${newsToDelete.titulo}" foi excluída com sucesso.`,
      });
      console.log("Notícia excluída:", newsToDelete);
    }
  };

  const handleSaveNews = async (newsData: NoticiasForm & { fotos: File[] }) => {
    try {

      const uploadedUrls = await Promise.all(
        newsData.fotos.map(async (file) => uploadFile(file))
      );

      if (modalMode === "create") {
        await createNoticia({
          noticia: newsData.noticia,
          fotosUrl: uploadedUrls,
        });

        toast({
          title: "Notícia criada",
          description: `A notícia "${newsData.noticia.titulo}" foi criada com sucesso.`,
        });
      } else if (modalMode === "edit") {

        if (newsData.noticia.id === undefined) {
          throw new Error("ID da notícia não definido para atualização.");
        }

        await updateNoticia({
          ...newsData,
          fotosUrl: uploadedUrls,
        });

        toast({
          title: "Notícia atualizada",
          description: `A notícia "${newsData.noticia.titulo}" foi atualizada com sucesso.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);

      toast({
        title: "Erro ao salvar notícia",
        description: "Ocorreu um erro ao salvar a notícia.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notícias</h2>
          <p className="text-muted-foreground">
            Gerencie as notícias do portal de turismo.
          </p>\
        </div>
        <Button
          className="bg-tourism-primary"
          onClick={() => handleOpenModal("create")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Notícia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Notícias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticias?.map((noticia) => (
                <TableRow key={noticia.id}>
                  <TableCell className="font-medium">{noticia.id}</TableCell>
                  <TableCell>{noticia.titulo}</TableCell>
                  <TableCell>{noticia.data.getUTCDate()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("view", noticia)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("edit", noticia)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(noticia)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedNews}
        onSave={handleSaveNews}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteNews}
        title="Excluir Notícia"
        description="Tem certeza que deseja excluir a notícia"
        itemName={newsToDelete?.titulo}
      />
    </div>
  );
}
