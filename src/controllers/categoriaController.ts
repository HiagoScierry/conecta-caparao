import { categoriaServiceFactory } from "@/factories/categoriaServiceFactory";

export async function getAllCategorias(){
  return categoriaServiceFactory().findAll();
}