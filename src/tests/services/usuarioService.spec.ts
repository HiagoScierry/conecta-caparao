import { UsuarioService } from "@/services/usuarioService";
import { IUsuarioRepository } from "@/repositories/interfaces/IUsuarioRepository";
import { UsuarioCreateDTO, UsuarioUpdateDTO, UsuarioLoginDTO } from "@/dto/usuarioDTO";
import * as bcrypt from "bcryptjs";

// Mock do bcrypt
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

describe("UsuarioService", () => {
  let usuarioService: UsuarioService;
  let usuarioRepositoryMock: jest.Mocked<IUsuarioRepository>;

  const mockUsuarioCompleto = {
    id: 1,
    nome: "Usuário Teste",
    email: "usuario@teste.com",
    senha: "hashedPassword123",
    admin: false,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  };

  const mockUsuarioResponse = {
    id: 1,
    nome: "Usuário Teste",
    email: "usuario@teste.com",
    admin: false,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  };

  beforeEach(() => {
    usuarioRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
    };
    usuarioService = new UsuarioService(usuarioRepositoryMock);
    
    // Reset dos mocks
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("deve retornar todos os usuários", async () => {
      // Arrange - Preparar lista de usuários
      const usuariosMock = [mockUsuarioResponse];
      usuarioRepositoryMock.findAll.mockResolvedValue(usuariosMock);

      // Act - Executar busca de todos os usuários
      const result = await usuarioService.findAll();

      // Assert - Verificar resultado
      expect(usuarioRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(usuariosMock);
    });

    it("deve retornar array vazio quando não há usuários", async () => {
      // Arrange - Preparar cenário sem usuários
      usuarioRepositoryMock.findAll.mockResolvedValue([]);

      // Act - Executar busca
      const result = await usuarioService.findAll();

      // Assert - Verificar array vazio
      expect(usuarioRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe("findById", () => {
    it("deve retornar usuário por ID", async () => {
      // Arrange - Preparar ID e mock de retorno
      const id = 1;
      usuarioRepositoryMock.findById.mockResolvedValue(mockUsuarioResponse);

      // Act - Executar busca por ID
      const result = await usuarioService.findById(id);

      // Assert - Verificar chamada e resultado
      expect(usuarioRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUsuarioResponse);
    });

    it("deve retornar null quando usuário não existe", async () => {
      // Arrange - Preparar ID inexistente
      const id = 999;
      usuarioRepositoryMock.findById.mockResolvedValue(null);

      // Act - Executar busca por ID inexistente
      const result = await usuarioService.findById(id);

      // Assert - Verificar retorno null
      expect(usuarioRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("deve criar um novo usuário", async () => {
      // Arrange - Preparar dados para criação
      const novoUsuario: UsuarioCreateDTO = {
        nome: "Novo Usuário",
        email: "novo@teste.com",
        senha: "senha123",
        admin: false,
      };
      usuarioRepositoryMock.findByEmail.mockResolvedValue(null); // Email não existe
      usuarioRepositoryMock.create.mockResolvedValue(mockUsuarioResponse);

      // Act - Executar criação
      const result = await usuarioService.create(novoUsuario);

      // Assert - Verificar criação e resultado
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(novoUsuario.email);
      expect(usuarioRepositoryMock.create).toHaveBeenCalledWith(novoUsuario);
      expect(result).toEqual(mockUsuarioResponse);
    });

    it("deve lançar erro quando email já existe", async () => {
      // Arrange - Preparar cenário com email existente
      const novoUsuario: UsuarioCreateDTO = {
        nome: "Novo Usuário",
        email: "existente@teste.com",
        senha: "senha123",
        admin: false,
      };
      usuarioRepositoryMock.findByEmail.mockResolvedValue(mockUsuarioCompleto);

      // Act & Assert - Executar criação e verificar erro
      await expect(usuarioService.create(novoUsuario)).rejects.toThrow("Email já está em uso");
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(novoUsuario.email);
      expect(usuarioRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("deve atualizar um usuário existente", async () => {
      // Arrange - Preparar dados de atualização
      const id = 1;
      const dadosAtualizacao: UsuarioUpdateDTO = {
        nome: "Nome Atualizado",
      };
      usuarioRepositoryMock.findById.mockResolvedValue(mockUsuarioResponse);
      usuarioRepositoryMock.update.mockResolvedValue({
        ...mockUsuarioResponse,
        nome: "Nome Atualizado",
      });

      // Act - Executar atualização
      const result = await usuarioService.update(id, dadosAtualizacao);

      // Assert - Verificar atualização
      expect(usuarioRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(usuarioRepositoryMock.update).toHaveBeenCalledWith(id, dadosAtualizacao);
      expect(result.nome).toBe("Nome Atualizado");
    });

    it("deve atualizar email quando não existe conflito", async () => {
      // Arrange - Preparar atualização de email
      const id = 1;
      const dadosAtualizacao: UsuarioUpdateDTO = {
        email: "novoemail@teste.com",
      };
      usuarioRepositoryMock.findById.mockResolvedValue(mockUsuarioResponse);
      usuarioRepositoryMock.findByEmail.mockResolvedValue(null); // Email não existe
      usuarioRepositoryMock.update.mockResolvedValue({
        ...mockUsuarioResponse,
        email: "novoemail@teste.com",
      });

      // Act - Executar atualização
      const result = await usuarioService.update(id, dadosAtualizacao);

      // Assert - Verificar atualização
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(dadosAtualizacao.email);
      expect(result.email).toBe("novoemail@teste.com");
    });

    it("deve lançar erro quando usuário não existe", async () => {
      // Arrange - Preparar cenário com usuário inexistente
      const id = 999;
      const dadosAtualizacao: UsuarioUpdateDTO = { nome: "Novo Nome" };
      usuarioRepositoryMock.findById.mockResolvedValue(null);

      // Act & Assert - Executar atualização e verificar erro
      await expect(usuarioService.update(id, dadosAtualizacao)).rejects.toThrow("Usuário não encontrado");
      expect(usuarioRepositoryMock.update).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando novo email já está em uso", async () => {
      // Arrange - Preparar cenário com email conflitante
      const id = 1;
      const dadosAtualizacao: UsuarioUpdateDTO = {
        email: "emailexistente@teste.com",
      };
      usuarioRepositoryMock.findById.mockResolvedValue(mockUsuarioResponse);
      usuarioRepositoryMock.findByEmail.mockResolvedValue({
        ...mockUsuarioCompleto,
        id: 2, // Usuário diferente com o mesmo email
      });

      // Act & Assert - Executar atualização e verificar erro
      await expect(usuarioService.update(id, dadosAtualizacao)).rejects.toThrow("Email já está em uso");
      expect(usuarioRepositoryMock.update).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("deve deletar um usuário existente", async () => {
      // Arrange - Preparar ID para exclusão
      const id = 1;
      usuarioRepositoryMock.findById.mockResolvedValue(mockUsuarioResponse);
      usuarioRepositoryMock.delete.mockResolvedValue(undefined);

      // Act - Executar exclusão
      await usuarioService.delete(id);

      // Assert - Verificar exclusão
      expect(usuarioRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(usuarioRepositoryMock.delete).toHaveBeenCalledWith(id);
    });

    it("deve lançar erro quando usuário não existe", async () => {
      // Arrange - Preparar ID inexistente
      const id = 999;
      usuarioRepositoryMock.findById.mockResolvedValue(null);

      // Act & Assert - Executar exclusão e verificar erro
      await expect(usuarioService.delete(id)).rejects.toThrow("Usuário não encontrado");
      expect(usuarioRepositoryMock.delete).not.toHaveBeenCalled();
    });
  });

  describe("authenticate", () => {
    it("deve autenticar usuário com credenciais válidas", async () => {
      // Arrange - Preparar credenciais válidas
      const credentials: UsuarioLoginDTO = {
        email: "usuario@teste.com",
        senha: "senha123",
      };
      usuarioRepositoryMock.findByEmail.mockResolvedValue(mockUsuarioCompleto);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Act - Executar autenticação
      const result = await usuarioService.authenticate(credentials);

      // Assert - Verificar autenticação bem-sucedida
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(credentials.senha, mockUsuarioCompleto.senha);
      expect(result).toEqual(mockUsuarioResponse); // Sem a senha
      expect(result).not.toHaveProperty('senha');
    });

    it("deve retornar null quando email não existe", async () => {
      // Arrange - Preparar email inexistente
      const credentials: UsuarioLoginDTO = {
        email: "inexistente@teste.com",
        senha: "senha123",
      };
      usuarioRepositoryMock.findByEmail.mockResolvedValue(null);

      // Act - Executar autenticação
      const result = await usuarioService.authenticate(credentials);

      // Assert - Verificar falha na autenticação
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("deve retornar null quando senha está incorreta", async () => {
      // Arrange - Preparar senha incorreta
      const credentials: UsuarioLoginDTO = {
        email: "usuario@teste.com",
        senha: "senhaErrada",
      };
      usuarioRepositoryMock.findByEmail.mockResolvedValue(mockUsuarioCompleto);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act - Executar autenticação
      const result = await usuarioService.authenticate(credentials);

      // Assert - Verificar falha na autenticação
      expect(usuarioRepositoryMock.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(credentials.senha, mockUsuarioCompleto.senha);
      expect(result).toBeNull();
    });
  });
});
