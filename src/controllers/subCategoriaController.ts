import { SubCategoriaServiceFactory } from "@/factories/subCategoriaServiceFactory";

export async function getAllSubCategorias(){
  return SubCategoriaServiceFactory().findAll();
}