import { ServicoTuristicoService } from "@/services/servicoTuristicoService";
import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "@/repositories/interfaces/IServicoTuristicoRepository";
import { ServicoTuristico } from "@prisma/client";

const mockRepository: jest.Mocked<IServicoTuristicoRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("ServicoTuristicoService", () => {
  let service: ServicoTuristicoService;

  beforeEach(() => {
    service = new ServicoTuristicoService(mockRepository);
    jest.clearAllMocks();
  });

  const mockServico: ServicoTuristicoWithRelations = {
    id: 1,
    nome: "Tour Histórico",
    descricao: "Passeio pelos pontos históricos da cidade",
    site: "https://exemplo.com",
    idEndereco: 10,
    idContato: 30,
    idMunicipio: 1,
  };

  const mockServicoResponse: ServicoTuristico = {
    id: 1,
    nome: "Tour Histórico",
    descricao: "Passeio pelos pontos históricos da cidade",
    site: "https://exemplo.com",
    idEndereco: 10,
    idContato: 30,
    idMunicipio: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("findById", () => {
    it("should return a service by ID", async () => {
      mockRepository.findById.mockResolvedValue(mockServicoResponse);

      const result = await service.findById(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockServicoResponse);
    });
  });

  describe("findAll", () => {
    it("should return all services", async () => {
      const services = [mockServicoResponse];
      mockRepository.findAll.mockResolvedValue(services);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(services);
    });
  });

  describe("create", () => {
    it("should create a new service", async () => {
      mockRepository.create.mockResolvedValue(mockServicoResponse);

      const result = await service.create(mockServico, "foto-url");

      expect(mockRepository.create).toHaveBeenCalledWith(mockServico, "foto-url");
      expect(result).toEqual(mockServicoResponse);
    });
  });

  describe("update", () => {
    it("should update a service by ID", async () => {
      const updatedServico = {
        ...mockServico,
        nome: "Tour Atualizado"
      };

      const updatedResponse = {
        ...mockServicoResponse,
        nome: "Tour Atualizado"
      };

      mockRepository.update.mockResolvedValue(updatedResponse);

      const result = await service.update(1, updatedServico, "foto-url");

      expect(mockRepository.update).toHaveBeenCalledWith(1, updatedServico, "foto-url");
      expect(result).toEqual(updatedResponse);
    });
  });

  describe("delete", () => {
    it("should delete a service by ID", async () => {
      mockRepository.delete.mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
