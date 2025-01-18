import { ApiResponse } from "@/utils/api/ApiResponse";

export async function GET(): Promise<Response> {
  return new ApiResponse({ message: 'GET /api/contato' }, 400);
}