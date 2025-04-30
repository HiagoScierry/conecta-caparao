import { contatoServiceFactory } from "@/factories/contatoServiceFactory";
import { ApiResponse } from "@/utils/api/ApiResponse";

export async function GET(): Promise<Response> {
  const contatoService = contatoServiceFactory();
}