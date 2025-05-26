import { IPerfilClienteRepository } from '@/repositories/interfaces/IPerfilClienteRepository';
import { PerfilClienteService } from '@/services/perfilClienteService';
import { PerfilCliente } from '@prisma/client';

describe('PerfilClienteService', () => {
  let service: PerfilClienteService;
  let repositoryMock: jest.Mocked<IPerfilClienteRepository>;

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new PerfilClienteService(repositoryMock);
  });

  test('should create a perfilCliente', async () => {
    // Arrange
    const nome = 'Aventureiro';
    const perfilMock: PerfilCliente = {
      id: 1,
      nome,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.create.mockResolvedValue(perfilMock);

    // Act
    const result = await service.create(nome);

    // Assert
    expect(repositoryMock.create).toHaveBeenCalledWith(nome);
    expect(result).toEqual(perfilMock);
  });

  test('should find perfilCliente by id', async () => {
    // Arrange
    const id = 1;
    const perfilMock: PerfilCliente = {
      id,
      nome: 'Aventureiro',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.findById.mockResolvedValue(perfilMock);

    // Act
    const result = await service.findById(id);

    // Assert
    expect(repositoryMock.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(perfilMock);
  });

  test('should return null if perfilCliente not found by id', async () => {
    // Arrange
    const id = 99;
    repositoryMock.findById.mockResolvedValue(null);

    // Act
    const result = await service.findById(id);

    // Assert
    expect(repositoryMock.findById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });

  test('should list all perfilClientes', async () => {
    // Arrange
    const perfisMock: PerfilCliente[] = [
      {
        id: 1,
        nome: 'Aventureiro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'Turista',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repositoryMock.findAll.mockResolvedValue(perfisMock);

    // Act
    const result = await service.findAll();

    // Assert
    expect(repositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(perfisMock);
  });

  test('should update perfilCliente', async () => {
    // Arrange
    const id = 1;
    const novoNome = 'Explorador';
    const perfilMock: PerfilCliente = {
      id,
      nome: novoNome,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.update.mockResolvedValue(perfilMock);

    // Act
    const result = await service.update(id, novoNome);

    // Assert
    expect(repositoryMock.update).toHaveBeenCalledWith(id, novoNome);
    expect(result).toEqual(perfilMock);
  });

  test('should delete perfilCliente', async () => {
    // Arrange
    const id = 1;
    const perfilMock: PerfilCliente = {
      id,
      nome: 'Aventureiro',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.delete.mockResolvedValue(perfilMock);

    // Act
    const result = await service.delete(id);

    // Assert
    expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual(perfilMock);
  });
});
