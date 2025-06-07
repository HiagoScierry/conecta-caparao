import { EnderecoService } from '@/services/enderecoService';
import { IEnderecoRepository } from '@/repositories/interfaces/IEnderecoRepository';
import { EnderecoDTO } from '@/dto/enderecoDTO';

describe('EnderecoService', () => {
  let enderecoService: EnderecoService;
  let enderecoRepository: jest.Mocked<IEnderecoRepository>;

  const fakeEndereco = {
    id: 1,
    cep: '29000-000',
    rua: 'Rua Exemplo',
    numero: '123',
    bairro: 'Centro',
    cidade: 'Vitória',
    estado: 'ES',
    complemento: 'Apto 101',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const enderecoDTO: EnderecoDTO = {
    cep: '29000-000',
    logradouro: 'Rua Exemplo',
    numero: '123',
    bairro: 'Centro',
    cidade: 'Vitória',
    estado: 'ES',
  };

  beforeEach(() => {
    enderecoRepository = {
      getById: jest.fn(),
      getByCep: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    enderecoService = new EnderecoService(enderecoRepository);
  });

  describe('getById', () => {
    it('should return endereco if found', async () => {
      // Arrange
      enderecoRepository.getById.mockResolvedValue(fakeEndereco);

      // Act
      const result = await enderecoService.getById(1);

      // Assert
      expect(enderecoRepository.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(fakeEndereco);
    });

    it('should throw error if endereco not found', async () => {
      // Arrange
      enderecoRepository.getById.mockResolvedValue(null);

      // Act & Assert
      await expect(enderecoService.getById(999)).rejects.toThrow('Endereço não encontrado');
      expect(enderecoRepository.getById).toHaveBeenCalledWith(999);
    });
  });

  describe('getByCep', () => {
    it('should return endereco if found by CEP', async () => {
      // Arrange
      enderecoRepository.getByCep.mockResolvedValue(fakeEndereco);

      // Act
      const result = await enderecoService.getByCep('29000-000');

      // Assert
      expect(enderecoRepository.getByCep).toHaveBeenCalledWith('29000-000');
      expect(result).toEqual(fakeEndereco);
    });

    it('should throw error if endereco not found by CEP', async () => {
      // Arrange
      enderecoRepository.getByCep.mockResolvedValue(null);

      // Act & Assert
      await expect(enderecoService.getByCep('99999-999')).rejects.toThrow('Endereço não encontrado');
      expect(enderecoRepository.getByCep).toHaveBeenCalledWith('99999-999');
    });
  });

  describe('create', () => {
    it('should create a new endereco', async () => {
      // Arrange
      enderecoRepository.create.mockResolvedValue(fakeEndereco);

      // Act
      const result = await enderecoService.create(enderecoDTO);

      // Assert
      expect(enderecoRepository.create).toHaveBeenCalledWith(enderecoDTO);
      expect(result).toEqual(fakeEndereco);
    });
  });

  describe('update', () => {
    it('should update an existing endereco', async () => {
      // Arrange
      const enderecoExistente = {
        id: 1,
        cep: '29000-000',
        rua: 'Rua Antiga',
        numero: '123',
        bairro: 'Centro',
        cidade: 'Vitória',
        estado: 'ES',
      };

      const enderecoAtualizado = {
        cep: '29000-000',
        logradouro: 'Rua Nova',
        numero: '123',
        bairro: 'Centro',
        cidade: 'Vitória',
        estado: 'ES',
      };

      const enderecoRepositoryMock: jest.Mocked<IEnderecoRepository> = {
        getById: jest.fn().mockResolvedValue(enderecoExistente),
        getByCep: jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockResolvedValue({ ...enderecoExistente, rua: enderecoAtualizado.logradouro }),
        delete: jest.fn(),
      };

      const enderecoService = new EnderecoService(enderecoRepositoryMock);

      // Act
      const result = await enderecoService.update(1, enderecoAtualizado);

      // Assert
      expect(enderecoRepositoryMock.getById).toHaveBeenCalledWith(1);
      expect(enderecoRepositoryMock.update).toHaveBeenCalledWith(1, enderecoAtualizado);
      expect(result.rua).toBe('Rua Nova');
    });

    it('should throw error if endereco does not exist', async () => {
      // Arrange
      enderecoRepository.getById.mockResolvedValue(null);

      // Act & Assert
      await expect(enderecoService.update(999, enderecoDTO)).rejects.toThrow('Endereço não encontrado');
      expect(enderecoRepository.getById).toHaveBeenCalledWith(999);
      expect(enderecoRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete endereco if it exists', async () => {
      // Arrange
      enderecoRepository.getById.mockResolvedValue(fakeEndereco);
      enderecoRepository.delete.mockResolvedValue();

      // Act
      await enderecoService.delete(1);

      // Assert
      expect(enderecoRepository.getById).toHaveBeenCalledWith(1);
      expect(enderecoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if endereco does not exist', async () => {
      // Arrange
      enderecoRepository.getById.mockResolvedValue(null);

      // Act & Assert
      await expect(enderecoService.delete(999)).rejects.toThrow('Endereço não encontrado');
      expect(enderecoRepository.getById).toHaveBeenCalledWith(999);
      expect(enderecoRepository.delete).not.toHaveBeenCalled();
    });
  });
});
