import { SubcategoriaService } from "@/services/subCategoriaService";
import { ISubCategoriaRepository } from "@/repositories/interfaces/ISubCategoriaRepository";
import { mockSubCategoria } from "@/tests/helpers/mockData";

describe("SubcategoriaService", () => {
  let subcategoriaService: SubcategoriaService;
  let subCategoriaRepositoryMock: jest.Mocked<ISubCategoriaRepository>;

  const mockSubcategorias = [
    mockSubCategoria,
    {
      id: 2,
      nome: "Subcategoria 2",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  ];

  beforeEach(() => {
    subCategoriaRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIds: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    subcategoriaService = new SubcategoriaService(subCategoriaRepositoryMock);
  });

  describe("create", () => {
    it("deve criar uma nova subcategoria", async () => {
      // Arrange - Preparar dados para criação
      const nome = "Nova Subcategoria";
      subCategoriaRepositoryMock.create.mockResolvedValue({
        ...mockSubCategoria,
        nome,
      });

      // Act - Executar criação
      const result = await subcategoriaService.create(nome);

      // Assert - Verificar criação e resultado
      expect(subCategoriaRepositoryMock.create).toHaveBeenCalledWith(nome);
      expect(result.nome).toBe(nome);
    });

    it("deve criar subcategoria com nome único", async () => {
      // Arrange - Preparar nome específico
      const nome = "Aventura";
      const subcategoriaCriada = {
        id: 3,
        nome,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      subCategoriaRepositoryMock.create.mockResolvedValue(subcategoriaCriada);

      // Act - Executar criação
      const result = await subcategoriaService.create(nome);

      // Assert - Verificar resultado específico
      expect(subCategoriaRepositoryMock.create).toHaveBeenCalledWith(nome);
      expect(result).toEqual(subcategoriaCriada);
      expect(result.id).toBe(3);
    });
  });

  describe("findById", () => {
    it("deve retornar subcategoria por ID", async () => {
      // Arrange - Preparar ID e mock de retorno
      const id = 1;
      subCategoriaRepositoryMock.findById.mockResolvedValue(mockSubCategoria);

      // Act - Executar busca por ID
      const result = await subcategoriaService.findById(id);

      // Assert - Verificar chamada e resultado
      expect(subCategoriaRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockSubCategoria);
    });

    it("deve retornar null quando subcategoria não existe", async () => {
      // Arrange - Preparar ID inexistente
      const id = 999;
      subCategoriaRepositoryMock.findById.mockResolvedValue(null);

      // Act - Executar busca por ID inexistente
      const result = await subcategoriaService.findById(id);

      // Assert - Verificar retorno null
      expect(subCategoriaRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe("findAll", () => {
    it("deve retornar todas as subcategorias", async () => {
      // Arrange - Preparar lista de subcategorias
      subCategoriaRepositoryMock.findAll.mockResolvedValue(mockSubcategorias);

      // Act - Executar busca de todas as subcategorias
      const result = await subcategoriaService.findAll();

      // Assert - Verificar resultado
      expect(subCategoriaRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSubcategorias);
      expect(result).toHaveLength(2);
    });

    it("deve retornar array vazio quando não há subcategorias", async () => {
      // Arrange - Preparar cenário sem subcategorias
      subCategoriaRepositoryMock.findAll.mockResolvedValue([]);

      // Act - Executar busca
      const result = await subcategoriaService.findAll();

      // Assert - Verificar array vazio
      expect(subCategoriaRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe("findByIds", () => {
    it("deve retornar subcategorias pelos IDs especificados", async () => {
      // Arrange - Preparar lista de IDs
      const ids = ["1", "2"];
      subCategoriaRepositoryMock.findByIds.mockResolvedValue(mockSubcategorias);

      // Act - Executar busca por IDs
      const result = await subcategoriaService.findByIds(ids);

      // Assert - Verificar chamada e resultado
      expect(subCategoriaRepositoryMock.findByIds).toHaveBeenCalledWith(ids);
      expect(result).toEqual(mockSubcategorias);
      expect(result).toHaveLength(2);
    });

    it("deve retornar null quando nenhuma subcategoria é encontrada pelos IDs", async () => {
      // Arrange - Preparar IDs inexistentes
      const ids = ["999", "998"];
      subCategoriaRepositoryMock.findByIds.mockResolvedValue(null);

      // Act - Executar busca por IDs inexistentes
      const result = await subcategoriaService.findByIds(ids);

      // Assert - Verificar retorno null
      expect(subCategoriaRepositoryMock.findByIds).toHaveBeenCalledWith(ids);
      expect(result).toBeNull();
    });

    it("deve retornar subcategorias parciais quando alguns IDs existem", async () => {
      // Arrange - Preparar IDs mistos (existentes e inexistentes)
      const ids = ["1", "999"];
      const subcategoriasParciais = [mockSubCategoria];
      subCategoriaRepositoryMock.findByIds.mockResolvedValue(subcategoriasParciais);

      // Act - Executar busca
      const result = await subcategoriaService.findByIds(ids);

      // Assert - Verificar resultado parcial
      expect(subCategoriaRepositoryMock.findByIds).toHaveBeenCalledWith(ids);
      expect(result).toEqual(subcategoriasParciais);
      expect(result).toHaveLength(1);
    });
  });

  describe("update", () => {
    it("deve atualizar uma subcategoria existente", async () => {
      // Arrange - Preparar dados de atualização
      const id = 1;
      const novoNome = "Subcategoria Atualizada";
      subCategoriaRepositoryMock.update.mockResolvedValue({
        ...mockSubCategoria,
        nome: novoNome,
        updatedAt: new Date(),
      });

      // Act - Executar atualização
      const result = await subcategoriaService.update(id, novoNome);

      // Assert - Verificar atualização e resultado
      expect(subCategoriaRepositoryMock.update).toHaveBeenCalledWith(id, novoNome);
      expect(result.nome).toBe(novoNome);
      expect(result.id).toBe(id);
    });

    it("deve manter outros campos inalterados durante atualização", async () => {
      // Arrange - Preparar atualização focada no nome
      const id = 1;
      const novoNome = "Nome Específico";
      const subcategoriaAtualizada = {
        ...mockSubCategoria,
        nome: novoNome,
      };
      subCategoriaRepositoryMock.update.mockResolvedValue(subcategoriaAtualizada);

      // Act - Executar atualização
      const result = await subcategoriaService.update(id, novoNome);

      // Assert - Verificar que outros campos permanecem iguais
      expect(result.id).toBe(mockSubCategoria.id);
      expect(result.createdAt).toEqual(mockSubCategoria.createdAt);
      expect(result.nome).toBe(novoNome);
    });
  });

  describe("delete", () => {
    it("deve deletar uma subcategoria", async () => {
      // Arrange - Preparar ID para exclusão
      const id = 1;
      subCategoriaRepositoryMock.delete.mockResolvedValue(mockSubCategoria);

      // Act - Executar exclusão
      const result = await subcategoriaService.delete(id);

      // Assert - Verificar exclusão e retorno da subcategoria deletada
      expect(subCategoriaRepositoryMock.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockSubCategoria);
    });

    it("deve retornar subcategoria deletada com dados corretos", async () => {
      // Arrange - Preparar subcategoria específica para deleção
      const id = 2;
      const subcategoriaParaDeletar = {
        id: 2,
        nome: "Subcategoria para Deletar",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      };
      subCategoriaRepositoryMock.delete.mockResolvedValue(subcategoriaParaDeletar);

      // Act - Executar exclusão
      const result = await subcategoriaService.delete(id);

      // Assert - Verificar dados da subcategoria deletada
      expect(subCategoriaRepositoryMock.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(subcategoriaParaDeletar);
      expect(result.id).toBe(2);
      expect(result.nome).toBe("Subcategoria para Deletar");
    });
  });

  describe("casos de erro", () => {
    it("deve propagar erro quando create falha", async () => {
      // Arrange - Preparar erro no repositório
      const nome = "Nova Subcategoria";
      const erro = new Error("Erro ao criar subcategoria");
      subCategoriaRepositoryMock.create.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(subcategoriaService.create(nome)).rejects.toThrow("Erro ao criar subcategoria");
    });

    it("deve propagar erro quando update falha", async () => {
      // Arrange - Preparar erro na atualização
      const id = 1;
      const nome = "Nome Atualizado";
      const erro = new Error("Subcategoria não encontrada");
      subCategoriaRepositoryMock.update.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(subcategoriaService.update(id, nome)).rejects.toThrow("Subcategoria não encontrada");
    });

    it("deve propagar erro quando delete falha", async () => {
      // Arrange - Preparar erro na exclusão
      const id = 1;
      const erro = new Error("Não é possível deletar subcategoria em uso");
      subCategoriaRepositoryMock.delete.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(subcategoriaService.delete(id)).rejects.toThrow("Não é possível deletar subcategoria em uso");
    });
  });
});
