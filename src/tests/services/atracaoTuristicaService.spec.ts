import { AtracaoTuristicaService } from "@/services/atracaoTuristicaService";
import { IAtracaoTuristicaRepository } from "@/repositories/interfaces/IAtracaoTuristicaRepository";

describe("AtracaoTuristicaService", () => {
  let atracaoTuristicaRepositoryMock: jest.Mocked<IAtracaoTuristicaRepository>;
  let atracaoTuristicaService: AtracaoTuristicaService;

  const atracaoMock = {
    id: 1,
    nome: "Parque Central",
    descricao: "Um belo parque no centro da cidade.", // OU null
    mapaUrl: "https://maps.example.com/parque", // OU null
    site: "https://parquecentral.com", // OU null
    idCategoria: 10,
    idMunicipio: 20,
    idEndereco: 30,
    idContato: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
  };


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
    it("should return all atracoes", async () => {
      atracaoTuristicaRepositoryMock.findAll.mockResolvedValue([atracaoMock]);

      const result = await atracaoTuristicaService.findAll();

      expect(atracaoTuristicaRepositoryMock.findAll).toHaveBeenCalled();
      expect(result).toEqual([atracaoMock]);
    });
  });

  describe("findById", () => {
    it("should return atracao by id", async () => {
      atracaoTuristicaRepositoryMock.findById.mockResolvedValue(atracaoMock);

      const result = await atracaoTuristicaService.findById(1);

      expect(atracaoTuristicaRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(atracaoMock);
    });
  });

  describe("create", () => {
    it("should create an atracao", async () => {
      atracaoTuristicaRepositoryMock.create.mockResolvedValue(atracaoMock);

      const result = await atracaoTuristicaService.create(atracaoMock);

      expect(atracaoTuristicaRepositoryMock.create).toHaveBeenCalledWith(atracaoMock);
      expect(result).toEqual(atracaoMock);
    });
  });

  describe("update", () => {
    it("should update an atracao", async () => {
      const updatedData = {
        ...atracaoMock,
        nome: "Parque Atualizado",
      };

      atracaoTuristicaRepositoryMock.update.mockResolvedValue(updatedData);

      const result = await atracaoTuristicaService.update(1, updatedData);

      expect(atracaoTuristicaRepositoryMock.update).toHaveBeenCalledWith(1, updatedData);
      expect(result).toEqual(updatedData);
    });
  });

  describe("delete", () => {
    it("should delete an atracao", async () => {
      atracaoTuristicaRepositoryMock.delete.mockResolvedValue(undefined);

      const result = await atracaoTuristicaService.delete(1);

      expect(atracaoTuristicaRepositoryMock.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
