import { usuarioServiceFactory } from "@/factories/usuarioServiceFactory";
import { UsuarioCreateDTO, UsuarioLoginDTO, UsuarioUpdateDTO } from "@/dto/usuarioDTO";

export async function getAllUsuarios() {
  return usuarioServiceFactory().findAll();
}

export async function getUsuarioById(id: number) {
  return usuarioServiceFactory().findById(id);
}

export async function createUsuario(data: UsuarioCreateDTO) {
  return usuarioServiceFactory().create(data);
}

export async function updateUsuario(id: number, data: UsuarioUpdateDTO) {
  return usuarioServiceFactory().update(id, data);
}

export async function deleteUsuario(id: number) {
  return usuarioServiceFactory().delete(id);
}

export async function authenticateUsuario(credentials: UsuarioLoginDTO) {
  return usuarioServiceFactory().authenticate(credentials);
}
