import { ServicoTuristicoService } from "@/services/servicoTuristicoService";
import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "@/repositories/interfaces/IServicoTuristicoRepository";

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
    idFoto: 20,
    idContato: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("findById", () => {
    it("should return a service by ID", async () => {
      mockRepository.findById.mockResolvedValue(mockServico);

      const result = await service.findById(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockServico);
    });
  });

  describe("findAll", () => {
    it("should return all services", async () => {
      const services = [mockServico];
      mockRepository.findAll.mockResolvedValue(services);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(services);
    });
  });

  describe("create", () => {
    it("should create a new service", async () => {
      mockRepository.create.mockResolvedValue(mockServico);

      const result = await service.create(mockServico);

      expect(mockRepository.create).toHaveBeenCalledWith(mockServico);
      expect(result).toEqual(mockServico);
    });
  });

  describe("update", () => {
    it("should update a service by ID", async () => {
      const updatedServico = {
        ...mockServico,
        nome: "Tour Atualizado"
      };

      mockRepository.update.mockResolvedValue(updatedServico);

      const result = await service.update(1, updatedServico);

      expect(mockRepository.update).toHaveBeenCalledWith(1, updatedServico);
      expect(result).toEqual(updatedServico);
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
