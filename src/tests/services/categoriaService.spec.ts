import { ICategoriaRepository } from '@/repositories/interfaces/ICategoriaRepository';
import { CategoriaService } from '@/services/categoriaService';
import { Categoria } from '@prisma/client';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let repositoryMock: jest.Mocked<ICategoriaRepository>;

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new CategoriaService(repositoryMock);
  });

  test('should create a categoria', async () => {
    // Arrange
    const nome = 'Praias';
    const categoriaMock: Categoria = {
      id: 1,
      nome,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.create.mockResolvedValue(categoriaMock);

    // Act
    const result = await service.create(nome);

    // Assert
    expect(repositoryMock.create).toHaveBeenCalledWith(nome);
    expect(result).toEqual(categoriaMock);
  });

  test('should find categoria by id', async () => {
    // Arrange
    const id = 1;
    const categoriaMock: Categoria = {
      id,
      nome: 'Praias',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.findById.mockResolvedValue(categoriaMock);

    // Act
    const result = await service.findById(id);

    // Assert
    expect(repositoryMock.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(categoriaMock);
  });

  test('should return null if categoria not found by id', async () => {
    // Arrange
    const id = 99;
    repositoryMock.findById.mockResolvedValue(null);

    // Act
    const result = await service.findById(id);

    // Assert
    expect(repositoryMock.findById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });

  test('should list all categorias', async () => {
    // Arrange
    const categoriasMock: Categoria[] = [
      {
        id: 1,
        nome: 'Praias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'Museus',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repositoryMock.findAll.mockResolvedValue(categoriasMock);

    // Act
    const result = await service.findAll();

    // Assert
    expect(repositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(categoriasMock);
  });

  test('should update categoria', async () => {
    // Arrange
    const id = 1;
    const novoNome = 'Parques';
    const categoriaMock: Categoria = {
      id,
      nome: novoNome,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.update.mockResolvedValue(categoriaMock);

    // Act
    const result = await service.update(id, novoNome);

    // Assert
    expect(repositoryMock.update).toHaveBeenCalledWith(id, novoNome);
    expect(result).toEqual(categoriaMock);
  });

  test('should delete categoria', async () => {
    // Arrange
    const id = 1;
    const categoriaMock: Categoria = {
      id,
      nome: 'Praias',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repositoryMock.delete.mockResolvedValue(categoriaMock);

    // Act
    const result = await service.delete(id);

    // Assert
    expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual(categoriaMock);
  });
});
