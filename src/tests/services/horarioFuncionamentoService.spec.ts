
import { IHorarioDeFuncionamentoRepository } from "@/repositories/interfaces/IHoraDeFuncionamentoRepository";
import { HorarioDeFuncionamento } from "@prisma/client";
import { HorarioDeFuncionamentoDTO } from "@/dto/horaFuncionamentoDTO";
import { HorarioFuncionamentoService } from "@/services/horarioFuncionamentoService";

describe("HorarioFuncionamentoService", () => {
  let repositoryMock: jest.Mocked<IHorarioDeFuncionamentoRepository>;
  let service: HorarioFuncionamentoService;

  beforeEach(() => {
    // Arrange - create repository mock
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByServicoTuristicoId: jest.fn(),
      findByAtracaoTuristicaId: jest.fn(),
    };

    service = new HorarioFuncionamentoService(repositoryMock);
  });

  describe("getAll", () => {
    it("should return all opening hours", async () => {
      // Arrange
      const mockHours: HorarioDeFuncionamento[] = [
        {
          id: 1,
          dia: "SEGUNDA",
          horario: "08:00 - 18:00",
          atracaoTuristicaId: null,
          servicoTuristicoId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repositoryMock.findAll.mockResolvedValue(mockHours);

      // Act
      const result = await service.getAll();

      // Assert
      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockHours);
    });
  });

  describe("getById", () => {
    it("should return the opening hour when found", async () => {
      // Arrange
      const mockHour: HorarioDeFuncionamento = {
        id: 1,
        dia: "TERCA",
        horario: "09:00 - 17:00",
        atracaoTuristicaId: 1,
        servicoTuristicoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repositoryMock.findById.mockResolvedValue(mockHour);

      // Act
      const result = await service.getById(1);

      // Assert
      expect(repositoryMock.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockHour);
    });

    it("should return null if the opening hour is not found", async () => {
      // Arrange
      repositoryMock.findById.mockResolvedValue(null);

      // Act
      const result = await service.getById(999);

      // Assert
      expect(repositoryMock.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create and return the opening hour", async () => {
      // Arrange
      const data: HorarioDeFuncionamentoDTO = {
        diaDaSemana: "QUARTA",
        horaAbertura: "08:00",
        horaFechamento: "16:00",
        estabelecimentoId: "1",
        tipoTurismo: "SERVIÇO",
      };
      const createdHour: HorarioDeFuncionamento = {
        id: 1,
        dia: "QUARTA",
        horario: "08:00 - 16:00",
        atracaoTuristicaId: null,
        servicoTuristicoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repositoryMock.create.mockResolvedValue(createdHour);

      // Act
      const result = await service.create(data);

      // Assert
      expect(repositoryMock.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdHour);
    });
  });

  describe("update", () => {
    it("should update and return the existing opening hour", async () => {
      // Arrange
      const id = 1;
      const data: HorarioDeFuncionamentoDTO = {
        diaDaSemana: "SEXTA",
        horaAbertura: "10:00",
        horaFechamento: "18:00",
        estabelecimentoId: "2",
        tipoTurismo: "ATRAÇÃO",
      };
      const existingHour: HorarioDeFuncionamento = {
        id,
        dia: "QUINTA",
        horario: "09:00 - 17:00",
        atracaoTuristicaId: 2,
        servicoTuristicoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedHour: HorarioDeFuncionamento = {
        ...existingHour,
        dia: data.diaDaSemana,
        horario: `${data.horaAbertura} - ${data.horaFechamento}`,
      };

      repositoryMock.findById.mockResolvedValue(existingHour);
      repositoryMock.update.mockResolvedValue(updatedHour);

      // Act
      const result = await service.update(id, data);

      // Assert
      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(repositoryMock.update).toHaveBeenCalledWith(id, data);
      expect(result).toEqual(updatedHour);
    });

    it("should throw an error if the opening hour does not exist", async () => {
      // Arrange
      repositoryMock.findById.mockResolvedValue(null);
      const id = 999;
      const data: HorarioDeFuncionamentoDTO = {
        diaDaSemana: "SEXTA",
        horaAbertura: "10:00",
        horaFechamento: "18:00",
        estabelecimentoId: "2",
        tipoTurismo: "ATRAÇÃO",
      };

      // Act & Assert
      await expect(service.update(id, data)).rejects.toThrow(
        `Horário de funcionamento com id ${id} não encontrado`
      );
      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(repositoryMock.update).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete the existing opening hour", async () => {
      // Arrange
      const id = 1;
      const existingHour: HorarioDeFuncionamento = {
        id,
        dia: "SABADO",
        horario: "08:00 - 12:00",
        atracaoTuristicaId: null,
        servicoTuristicoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repositoryMock.findById.mockResolvedValue(existingHour);
      repositoryMock.delete.mockResolvedValue();

      // Act
      await service.delete(id);

      // Assert
      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    });

    it("should throw an error if the opening hour does not exist", async () => {
      // Arrange
      repositoryMock.findById.mockResolvedValue(null);
      const id = 999;

      // Act & Assert
      await expect(service.delete(id)).rejects.toThrow(
        `Horário de funcionamento com id ${id} não encontrado`
      );
      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(repositoryMock.delete).not.toHaveBeenCalled();
    });
  });

  describe("getByServicoTuristicoID", () => {
    it("should return opening hours by service tourism id", async () => {
      // Arrange
      const serviceId = 2;
      const mockHours: HorarioDeFuncionamento[] = [
        {
          id: 1,
          dia: "SEGUNDA",
          horario: "10:00 - 14:00",
          atracaoTuristicaId: null,
          servicoTuristicoId: serviceId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repositoryMock.findByServicoTuristicoId.mockResolvedValue(mockHours);

      // Act
      const result = await service.getByServicoTuristicoID(serviceId);

      // Assert
      expect(repositoryMock.findByServicoTuristicoId).toHaveBeenCalledWith(serviceId);
      expect(result).toEqual(mockHours);
    });
  });

  describe("getByAtracaoTuristicaId", () => {
    it("should return opening hours by attraction tourism id", async () => {
      // Arrange
      const attractionId = 3;
      const mockHours: HorarioDeFuncionamento[] = [
        {
          id: 1,
          dia: "QUARTA",
          horario: "08:00 - 18:00",
          atracaoTuristicaId: attractionId,
          servicoTuristicoId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repositoryMock.findByAtracaoTuristicaId.mockResolvedValue(mockHours);

      // Act
      const result = await service.getByAtracaoTuristicaId(attractionId);

      // Assert
      expect(repositoryMock.findByAtracaoTuristicaId).toHaveBeenCalledWith(attractionId);
      expect(result).toEqual(mockHours);
    });
  });
});
