"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { NewsModal } from "@/components/modals/NewsModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";

export default function Noticias() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<any>(null);

  const [noticias, setNoticias] = useState([
    { id: 1, titulo: "Nova atração turística inaugurada", data: "2023-01-05", autor: "João Silva" },
    { id: 2, titulo: "Festival de Verão bate recorde de público", data: "2023-01-20", autor: "Maria Souza" },
    { id: 3, titulo: "Turismo aquece economia local", data: "2023-02-10", autor: "Carlos Oliveira" },
    { id: 4, titulo: "Novas rotas turísticas são anunciadas", data: "2023-03-15", autor: "Ana Santos" },
    { id: 5, titulo: "Exposição internacional chega à cidade", data: "2023-04-01", autor: "Pedro Costa" },
  ]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', news?: any) => {
    setModalMode(mode);
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (news: any) => {
    setNewsToDelete(news);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteNews = () => {
    if (newsToDelete) {
      setNoticias(noticias.filter(noticia => noticia.id !== newsToDelete.id));
      toast({
        title: "Notícia excluída",
        description: `A notícia "${newsToDelete.titulo}" foi excluída com sucesso.`,
      });
      console.log('Notícia excluída:', newsToDelete);
    }
  };

  const handleSaveNews = (newsData: any) => {
    if (modalMode === 'create') {
      const newNews = { ...newsData, id: Date.now() };
      setNoticias([...noticias, newNews]);
      toast({
        title: "Notícia criada",
        description: `A notícia "${newsData.titulo}" foi criada com sucesso.`,
      });
    } else if (modalMode === 'edit') {
      setNoticias(noticias.map(noticia => 
        noticia.id === selectedNews.id ? { ...noticia, ...newsData } : noticia
      ));
      toast({
        title: "Notícia atualizada",
        description: `A notícia "${newsData.titulo}" foi atualizada com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notícias</h2>
          <p className="text-muted-foreground">
            Gerencie as notícias do portal de turismo.
          </p>
        </div>
        <Button 
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create')}
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
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticias.map((noticia) => (
                <TableRow key={noticia.id}>
                  <TableCell className="font-medium">{noticia.id}</TableCell>
                  <TableCell>{noticia.titulo}</TableCell>
                  <TableCell>{noticia.data}</TableCell>
                  <TableCell>{noticia.autor}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('view', noticia)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('edit', noticia)}
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
