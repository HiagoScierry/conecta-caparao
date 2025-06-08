/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventoService } from "@/services/eventoService";
import { IEventoRepository, EventoWithRelations } from "@/repositories/interfaces/IEventoRepository";

describe("EventoService", () => {
  let eventoRepository: jest.Mocked<IEventoRepository>;
  let eventoService: EventoService;

  beforeEach(() => {
    eventoRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    eventoService = new EventoService(eventoRepository);
  });

  it("deve retornar todos os eventos (findAll)", async () => {
    // Arrange
    const eventosMock = [{ id: 1, nome: "Evento 1" }] as any;
    eventoRepository.findAll.mockResolvedValue(eventosMock);

    // Act
    const result = await eventoService.findAll();

    // Assert
    expect(eventoRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toBe(eventosMock);
  });

  it("deve retornar um evento pelo ID (findById)", async () => {
    // Arrange
    const eventoMock = { id: 1, nome: "Evento Teste" } as any;
    eventoRepository.findById.mockResolvedValue(eventoMock);

    // Act
    const result = await eventoService.findById(1);

    // Assert
    expect(eventoRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toBe(eventoMock);
  });

  it("deve criar um evento (create)", async () => {
    // Arrange
    const eventoData = {
      nome: "Novo Evento",
      descricao: "Descrição",
      data: new Date(),
      idMunicipio: 1,
      idEndereco: 2,
      fotos: [],
    } as EventoWithRelations;

    const eventoCriado = {
      id: 1,
      nome: "Novo Evento",
      descricao: "Descrição do evento",
      data: new Date(),
      idMunicipio: 1,
      idEndereco: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      fotos: [{ url: "http://foto.com", capa: true }],
    };

    eventoRepository.create.mockResolvedValue(eventoCriado);

    // Act
    const result = await eventoService.create(eventoData);

    // Assert
    expect(eventoRepository.create).toHaveBeenCalledWith(eventoData);
    expect(result).toBe(eventoCriado);
  });

  it("deve atualizar um evento (update)", async () => {
    // Arrange
    const eventoData = {
      nome: "Evento Atualizado",
      descricao: "Desc atualizada",
      data: new Date(),
      idMunicipio: 1,
      idEndereco: 2,
      fotos: [],
    } as EventoWithRelations;

    const eventoAtualizado = {
      id: 1,
      nome: "Evento Atualizado",
      descricao: "Desc atualizada",
      data: new Date(),
      idMunicipio: 1,
      idEndereco: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      fotos: [{ url: "http://foto.com", capa: false }],
    };

    eventoRepository.update.mockResolvedValue(eventoAtualizado);

    eventoRepository.update.mockResolvedValue(eventoAtualizado);

    // Act
    const result = await eventoService.update(1, eventoData);

    // Assert
    expect(eventoRepository.update).toHaveBeenCalledWith(1, eventoData);
    expect(result).toBe(eventoAtualizado);
  });

  it("deve deletar um evento (delete)", async () => {
    // Arrange
    const retornoEsperado = { success: true } as any;
    eventoRepository.delete.mockResolvedValue(retornoEsperado);

    // Act
    const result = await eventoService.delete(1);

    // Assert
    expect(eventoRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(retornoEsperado);
  });
});
