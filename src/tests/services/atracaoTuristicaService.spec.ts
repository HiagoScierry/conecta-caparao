import { AtracaoTuristicaService } from "@/services/atracaoTuristicaService";
import { IAtracaoTuristicaRepository } from "@/repositories/interfaces/IAtracaoTuristicaRepository";
import { mockAtracaoTuristica } from "@/tests/helpers/mockData";
import { AtracaoForm } from "@/forms/atracaoForm";

describe("AtracaoTuristicaService", () => {
  let atracaoTuristicaService: AtracaoTuristicaService;
  let atracaoTuristicaRepositoryMock: jest.Mocked<IAtracaoTuristicaRepository>;

  beforeEach(() => {
    atracaoTuristicaRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    atracaoTuristicaService = new AtracaoTuristicaService(atracaoTuristicaRepositoryMock);
  });

  describe("findAll", () => {
    it("deve retornar todas as atrações turísticas", async () => {
      // Arrange - Preparar dados de teste
      const atracoesMock = [mockAtracaoTuristica];
      atracaoTuristicaRepositoryMock.findAll.mockResolvedValue(atracoesMock);

      // Act - Executar ação a ser testada
      const result = await atracaoTuristicaService.findAll();

      // Assert - Verificar resultados
      expect(atracaoTuristicaRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(atracoesMock);
    });

    it("deve retornar array vazio quando não há atrações", async () => {
      // Arrange - Preparar cenário sem atrações
      atracaoTuristicaRepositoryMock.findAll.mockResolvedValue([]);

      // Act - Executar busca
      const result = await atracaoTuristicaService.findAll();

      // Assert - Verificar array vazio
      expect(atracaoTuristicaRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe("findById", () => {
    it("deve retornar atração turística por ID", async () => {
      // Arrange - Preparar ID e mock de retorno
      const id = 1;
      atracaoTuristicaRepositoryMock.findById.mockResolvedValue(mockAtracaoTuristica);

      // Act - Executar busca por ID
      const result = await atracaoTuristicaService.findById(id);

      // Assert - Verificar chamada e resultado
      expect(atracaoTuristicaRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockAtracaoTuristica);
    });

    it("deve retornar null quando atração não existe", async () => {
      // Arrange - Preparar ID inexistente
      const id = 999;
      atracaoTuristicaRepositoryMock.findById.mockResolvedValue(null);

      // Act - Executar busca por ID inexistente
      const result = await atracaoTuristicaService.findById(id);

      // Assert - Verificar retorno null
      expect(atracaoTuristicaRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("deve criar uma nova atração turística", async () => {
      // Arrange - Preparar dados para criação
      const novaAtracaoForm: AtracaoForm = {
        atracaoTuristica: {
          nome: "Nova Atração",
          descricao: "Descrição da nova atração",
          mapaUrl: "https://maps.exemplo.com",
          site: "https://site.exemplo.com",
        },
        endereco: {
          logradouro: "Rua Teste",
          numero: "123",
          bairro: "Bairro Teste",
          cep: "12345678",
        },
        contato: {
          telefone: "(11) 99999-9999",
          celular: "(11) 88888-8888",
          email: "teste@teste.com",
          whatsapp: "11999999999",
          instagram: "@teste",
        },
        municipio: "1",
        categoria: 1,
        subCategoria: [1],
        perfil: ["1"],
        horarioFuncionamento: {
          diaDaSemana: ["SEGUNDA"],
          horaAbertura: "08:00",
          horaFechamento: "18:00",
        },
      };
      const fotosUrl = ["https://exemplo.com/foto1.jpg"];
      atracaoTuristicaRepositoryMock.create.mockResolvedValue(mockAtracaoTuristica);

      // Act - Executar criação
      const result = await atracaoTuristicaService.create(novaAtracaoForm, fotosUrl);

      // Assert - Verificar criação e resultado
      expect(atracaoTuristicaRepositoryMock.create).toHaveBeenCalledWith(novaAtracaoForm, fotosUrl);
      expect(result).toEqual(mockAtracaoTuristica);
    });
  });

  describe("update", () => {
    it("deve atualizar uma atração turística existente", async () => {
      // Arrange - Preparar dados de atualização
      const id = 1;
      const dadosAtualizacao: AtracaoForm = {
        atracaoTuristica: {
          nome: "Atração Atualizada",
          descricao: "Descrição atualizada",
          mapaUrl: "https://maps.exemplo.com",
          site: "https://site.exemplo.com",
        },
        endereco: {
          logradouro: "Rua Atualizada",
          numero: "456",
          bairro: "Bairro Atualizado",
          cep: "87654321",
        },
        contato: {
          telefone: "(11) 77777-7777",
          celular: "(11) 66666-6666",
          email: "atualizado@teste.com",
          whatsapp: "11777777777",
          instagram: "@atualizado",
        },
        municipio: "1",
        categoria: 1,
        subCategoria: [1],
        perfil: ["1"],
        horarioFuncionamento: {
          diaDaSemana: ["SEGUNDA", "TERCA"],
          horaAbertura: "09:00",
          horaFechamento: "17:00",
        },
      };
      const perfisParaRemover = ["2"];
      const fotosUrl = ["https://exemplo.com/foto-atualizada.jpg"];
      atracaoTuristicaRepositoryMock.update.mockResolvedValue({
        ...mockAtracaoTuristica,
        nome: "Atração Atualizada",
      });

      // Act - Executar atualização
      const result = await atracaoTuristicaService.update(id, dadosAtualizacao, perfisParaRemover, fotosUrl);

      // Assert - Verificar atualização e resultado
      expect(atracaoTuristicaRepositoryMock.update).toHaveBeenCalledWith(id, dadosAtualizacao, perfisParaRemover, fotosUrl);
      expect(result.nome).toBe("Atração Atualizada");
    });
  });

  describe("delete", () => {
    it("deve deletar uma atração turística", async () => {
      // Arrange - Preparar ID para exclusão
      const id = 1;
      atracaoTuristicaRepositoryMock.delete.mockResolvedValue(undefined);

      // Act - Executar exclusão
      await atracaoTuristicaService.delete(id);

      // Assert - Verificar exclusão
      expect(atracaoTuristicaRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
