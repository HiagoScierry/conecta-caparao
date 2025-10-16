import { UsuarioCreateDTO, UsuarioDTO, UsuarioResponseDTO, UsuarioUpdateDTO } from "@/dto/usuarioDTO";
import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import { connection } from "@/config/database/connection";
import bcrypt from "bcryptjs";

export class UsuarioPrismaRepository implements IUsuarioRepository {
  async create(data: UsuarioCreateDTO): Promise<UsuarioResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    
    const usuario = await connection.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword,
        admin: data.admin || false,
      },
    });

    // Retorna sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioResponse } = usuario;
    return usuarioResponse;
  }

  async update(id: number, data: UsuarioUpdateDTO): Promise<UsuarioResponseDTO> {
    // Se tem senha para atualizar, criptografa
    const updateData = { ...data };
    if (data.senha) {
      updateData.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuario = await connection.usuario.update({
      where: { id },
      data: updateData,
    });

    // Retorna sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioResponse } = usuario;
    return usuarioResponse;
  }

  async delete(id: number): Promise<void> {
    await connection.usuario.delete({
      where: { id },
    });
  }

  async findAll(): Promise<UsuarioResponseDTO[]> {
    const usuarios = await connection.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        admin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return usuarios;
  }

  async findById(id: number): Promise<UsuarioResponseDTO | null> {
    const usuario = await connection.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        admin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return usuario;
  }

  async findByEmail(email: string): Promise<UsuarioDTO | null> {
    const usuario = await connection.usuario.findUnique({
      where: { email },
    });

    return usuario;
  }
}
