import { DashboardService, DashboardStats, AtracoesPorMunicipio, ProximoEvento, UltimaNoticias } from "@/services/dashboardService";
import { IDashboardRepository } from "@/repositories/interfaces/IDashboardRepository";

describe("DashboardService", () => {
  let dashboardService: DashboardService;
  let dashboardRepositoryMock: jest.Mocked<IDashboardRepository>;

  const mockStats: DashboardStats = {
    municipios: 5,
    atracoes: 15,
    eventos: 8,
    noticias: 12,
    servicos: 20,
  };

  const mockAtracoesPorMunicipio: AtracoesPorMunicipio[] = [
    { municipio: "Capão da Canoa", quantidade: 5 },
    { municipio: "Torres", quantidade: 4 },
    { municipio: "Xangri-lá", quantidade: 3 },
  ];

  const mockProximosEventos: ProximoEvento[] = [
    {
      id: 1,
      nome: "Festival de Verão",
      data: "2024-02-15",
      municipio: "Capão da Canoa",
    },
    {
      id: 2,
      nome: "Feira de Artesanato",
      data: "2024-02-20",
      municipio: "Torres",
    },
  ];

  const mockUltimasNoticias: UltimaNoticias[] = [
    {
      id: 1,
      titulo: "Nova atração inaugurada",
      resumo: "Parque aquático abre suas portas",
      dataPublicacao: "2024-01-15",
    },
    {
      id: 2,
      titulo: "Festival confirmado",
      resumo: "Evento será realizado no verão",
      dataPublicacao: "2024-01-10",
    },
  ];

  beforeEach(() => {
    dashboardRepositoryMock = {
      getStats: jest.fn(),
      getAtracoesPorMunicipio: jest.fn(),
      getProximosEventos: jest.fn(),
      getUltimasNoticias: jest.fn(),
    };
    dashboardService = new DashboardService(dashboardRepositoryMock);
  });

  describe("getStats", () => {
    it("deve retornar estatísticas do dashboard", async () => {
      // Arrange - Preparar mock das estatísticas
      dashboardRepositoryMock.getStats.mockResolvedValue(mockStats);

      // Act - Executar busca das estatísticas
      const result = await dashboardService.getStats();

      // Assert - Verificar resultado
      expect(dashboardRepositoryMock.getStats).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStats);
      expect(result.municipios).toBe(5);
      expect(result.atracoes).toBe(15);
      expect(result.eventos).toBe(8);
      expect(result.noticias).toBe(12);
      expect(result.servicos).toBe(20);
    });

    it("deve retornar estatísticas zeradas quando não há dados", async () => {
      // Arrange - Preparar estatísticas zeradas
      const statsVazias: DashboardStats = {
        municipios: 0,
        atracoes: 0,
        eventos: 0,
        noticias: 0,
        servicos: 0,
      };
      dashboardRepositoryMock.getStats.mockResolvedValue(statsVazias);

      // Act - Executar busca
      const result = await dashboardService.getStats();

      // Assert - Verificar estatísticas zeradas
      expect(result).toEqual(statsVazias);
      expect(Object.values(result).every(value => value === 0)).toBe(true);
    });
  });

  describe("getAtracoesPorMunicipio", () => {
    it("deve retornar lista de atrações por município", async () => {
      // Arrange - Preparar dados de atrações por município
      dashboardRepositoryMock.getAtracoesPorMunicipio.mockResolvedValue(mockAtracoesPorMunicipio);

      // Act - Executar busca de atrações por município
      const result = await dashboardService.getAtracoesPorMunicipio();

      // Assert - Verificar resultado
      expect(dashboardRepositoryMock.getAtracoesPorMunicipio).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockAtracoesPorMunicipio);
      expect(result).toHaveLength(3);
      expect(result[0].municipio).toBe("Capão da Canoa");
      expect(result[0].quantidade).toBe(5);
    });

    it("deve retornar array vazio quando não há atrações", async () => {
      // Arrange - Preparar cenário sem atrações
      dashboardRepositoryMock.getAtracoesPorMunicipio.mockResolvedValue([]);

      // Act - Executar busca
      const result = await dashboardService.getAtracoesPorMunicipio();

      // Assert - Verificar array vazio
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("getProximosEventos", () => {
    it("deve retornar próximos eventos com limite padrão", async () => {
      // Arrange - Preparar próximos eventos
      dashboardRepositoryMock.getProximosEventos.mockResolvedValue(mockProximosEventos);

      // Act - Executar busca sem especificar limite
      const result = await dashboardService.getProximosEventos();

      // Assert - Verificar resultado com limite padrão
      expect(dashboardRepositoryMock.getProximosEventos).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockProximosEventos);
      expect(result).toHaveLength(2);
    });

    it("deve retornar próximos eventos com limite customizado", async () => {
      // Arrange - Preparar eventos com limite específico
      const limite = 3;
      dashboardRepositoryMock.getProximosEventos.mockResolvedValue(mockProximosEventos.slice(0, limite));

      // Act - Executar busca com limite customizado
      const result = await dashboardService.getProximosEventos(limite);

      // Assert - Verificar resultado com limite customizado
      expect(dashboardRepositoryMock.getProximosEventos).toHaveBeenCalledWith(limite);
      expect(result).toHaveLength(2); // Máximo disponível no mock
    });

    it("deve retornar array vazio quando não há eventos próximos", async () => {
      // Arrange - Preparar cenário sem eventos
      dashboardRepositoryMock.getProximosEventos.mockResolvedValue([]);

      // Act - Executar busca
      const result = await dashboardService.getProximosEventos();

      // Assert - Verificar array vazio
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("getUltimasNoticias", () => {
    it("deve retornar últimas notícias com limite padrão", async () => {
      // Arrange - Preparar últimas notícias
      dashboardRepositoryMock.getUltimasNoticias.mockResolvedValue(mockUltimasNoticias);

      // Act - Executar busca sem especificar limite
      const result = await dashboardService.getUltimasNoticias();

      // Assert - Verificar resultado com limite padrão
      expect(dashboardRepositoryMock.getUltimasNoticias).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockUltimasNoticias);
      expect(result).toHaveLength(2);
      expect(result[0].titulo).toBe("Nova atração inaugurada");
    });

    it("deve retornar últimas notícias com limite customizado", async () => {
      // Arrange - Preparar notícias com limite específico
      const limite = 1;
      dashboardRepositoryMock.getUltimasNoticias.mockResolvedValue(mockUltimasNoticias.slice(0, limite));

      // Act - Executar busca com limite customizado
      const result = await dashboardService.getUltimasNoticias(limite);

      // Assert - Verificar resultado com limite customizado
      expect(dashboardRepositoryMock.getUltimasNoticias).toHaveBeenCalledWith(limite);
      expect(result).toHaveLength(1);
      expect(result[0].titulo).toBe("Nova atração inaugurada");
    });

    it("deve retornar array vazio quando não há notícias", async () => {
      // Arrange - Preparar cenário sem notícias
      dashboardRepositoryMock.getUltimasNoticias.mockResolvedValue([]);

      // Act - Executar busca
      const result = await dashboardService.getUltimasNoticias();

      // Assert - Verificar array vazio
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("casos de erro", () => {
    it("deve propagar erro quando getStats falha", async () => {
      // Arrange - Preparar erro no repositório
      const erro = new Error("Erro no banco de dados");
      dashboardRepositoryMock.getStats.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(dashboardService.getStats()).rejects.toThrow("Erro no banco de dados");
    });

    it("deve propagar erro quando getAtracoesPorMunicipio falha", async () => {
      // Arrange - Preparar erro no repositório
      const erro = new Error("Falha na consulta");
      dashboardRepositoryMock.getAtracoesPorMunicipio.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(dashboardService.getAtracoesPorMunicipio()).rejects.toThrow("Falha na consulta");
    });

    it("deve propagar erro quando getProximosEventos falha", async () => {
      // Arrange - Preparar erro no repositório
      const erro = new Error("Erro ao buscar eventos");
      dashboardRepositoryMock.getProximosEventos.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(dashboardService.getProximosEventos()).rejects.toThrow("Erro ao buscar eventos");
    });

    it("deve propagar erro quando getUltimasNoticias falha", async () => {
      // Arrange - Preparar erro no repositório
      const erro = new Error("Erro ao buscar notícias");
      dashboardRepositoryMock.getUltimasNoticias.mockRejectedValue(erro);

      // Act & Assert - Executar e verificar propagação do erro
      await expect(dashboardService.getUltimasNoticias()).rejects.toThrow("Erro ao buscar notícias");
    });
  });
});
