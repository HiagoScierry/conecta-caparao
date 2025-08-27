import { perfilClienteServiceFactory } from "@/factories/perfilClienteServiceFactory";

export async function getAllPerfis(){
  return perfilClienteServiceFactory().findAll();
}