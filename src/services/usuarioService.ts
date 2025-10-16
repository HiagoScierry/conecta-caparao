import { UsuarioCreateDTO, UsuarioResponseDTO, UsuarioUpdateDTO, UsuarioLoginDTO } from "@/dto/usuarioDTO";
import { IUsuarioRepository } from "@/repositories/interfaces/IUsuarioRepository";
import bcrypt from "bcryptjs";

export class UsuarioService {
  private usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll(): Promise<UsuarioResponseDTO[]> {
    return this.usuarioRepository.findAll();
  }

  async findById(id: number): Promise<UsuarioResponseDTO | null> {
    return this.usuarioRepository.findById(id);
  }

  async create(data: UsuarioCreateDTO): Promise<UsuarioResponseDTO> {
    // Verifica se email já existe
    const existingUser = await this.usuarioRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    return this.usuarioRepository.create(data);
  }

  async update(id: number, data: UsuarioUpdateDTO): Promise<UsuarioResponseDTO> {
    // Verifica se o usuário existe
    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    // Se está mudando email, verifica se o novo email já está em uso
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.usuarioRepository.findByEmail(data.email);
      if (emailExists) {
        throw new Error("Email já está em uso");
      }
    }

    return this.usuarioRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    return this.usuarioRepository.delete(id);
  }

  async authenticate(credentials: UsuarioLoginDTO): Promise<UsuarioResponseDTO | null> {
    const user = await this.usuarioRepository.findByEmail(credentials.email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(credentials.senha, user.senha);
    
    if (!isPasswordValid) {
      return null;
    }

    // Retorna usuário sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...userResponse } = user;
    return userResponse;
  }
}
