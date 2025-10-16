import { noticiaServiceFactory } from "@/factories/noticiaServiceFactory";
import { NoticiasForm } from "@/forms/noticiasForm";

export async function getAllNoticias(){
  return noticiaServiceFactory().findAll();
}

export async function getNoticiaById(id: number){
  return noticiaServiceFactory().findById(id);
}

export async function createNoticia(data: NoticiasForm & { fotosUrl: string[] }){
  return noticiaServiceFactory().create(data.noticia, data.fotosUrl);
}

export async function updateNoticia(id: number, data: NoticiasForm & { fotosUrl: string[] }){
  console.log(data);

  return noticiaServiceFactory().update(id, data.noticia, data.fotosUrl);
}

export async function deleteNoticia(id: number){
  return noticiaServiceFactory().delete(id);
}