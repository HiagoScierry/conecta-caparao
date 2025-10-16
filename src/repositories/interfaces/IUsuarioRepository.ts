import { UsuarioCreateDTO, UsuarioDTO, UsuarioResponseDTO, UsuarioUpdateDTO } from "@/dto/usuarioDTO";

export interface IUsuarioRepository {
  create(data: UsuarioCreateDTO): Promise<UsuarioResponseDTO>;
  update(id: number, data: UsuarioUpdateDTO): Promise<UsuarioResponseDTO>;
  delete(id: number): Promise<void>;
  findAll(): Promise<UsuarioResponseDTO[]>;
  findById(id: number): Promise<UsuarioResponseDTO | null>;
  findByEmail(email: string): Promise<UsuarioDTO | null>;
}
