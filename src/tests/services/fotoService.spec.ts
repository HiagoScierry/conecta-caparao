import { FotoService } from '@/services/fotoService';
import { IFotoRepository } from '@/repositories/interfaces/IFotoRepository';

describe('FotoService', () => {
  let fotoService: FotoService;
  let fotoRepository: jest.Mocked<IFotoRepository>;

  const fakeFoto = {
    id: '123',
    url: 'https://example.com/foto.jpg',
  };

  beforeEach(() => {
    fotoRepository = {
      getFotoById: jest.fn(),
      getAllFotos: jest.fn(),
      createFoto: jest.fn(),
      deleteFoto: jest.fn(),
    };

    fotoService = new FotoService(fotoRepository);
  });

  it('should return foto by ID if it exists', async () => {
    fotoRepository.getFotoById.mockResolvedValue(fakeFoto);

    const result = await fotoService.getFotoById('123');

    expect(fotoRepository.getFotoById).toHaveBeenCalledWith('123');
    expect(result).toEqual(fakeFoto);
  });

  it('should throw error if foto does not exist (getFotoById)', async () => {
    fotoRepository.getFotoById.mockResolvedValue(null);

    await expect(fotoService.getFotoById('notfound')).rejects.toThrow('Foto not found');
    expect(fotoRepository.getFotoById).toHaveBeenCalledWith('notfound');
  });

  it('should return all fotos', async () => {
    fotoRepository.getAllFotos.mockResolvedValue([fakeFoto]);

    const result = await fotoService.getAllFotos();

    expect(fotoRepository.getAllFotos).toHaveBeenCalled();
    expect(result).toEqual([fakeFoto]);
  });

  it('should create a new foto', async () => {
    fotoRepository.createFoto.mockResolvedValue(fakeFoto);

    const result = await fotoService.createFoto('https://example.com/foto.jpg');

    expect(fotoRepository.createFoto).toHaveBeenCalledWith('https://example.com/foto.jpg');
    expect(result).toEqual(fakeFoto);
  });

  it('should delete a foto if it exists', async () => {
    fotoRepository.getFotoById.mockResolvedValue(fakeFoto);
    fotoRepository.deleteFoto.mockResolvedValue();

    await fotoService.deleteFoto('123');

    expect(fotoRepository.getFotoById).toHaveBeenCalledWith('123');
    expect(fotoRepository.deleteFoto).toHaveBeenCalledWith('123');
  });

  it('should throw error when trying to delete a non-existent foto', async () => {
    fotoRepository.getFotoById.mockResolvedValue(null);

    await expect(fotoService.deleteFoto('notfound')).rejects.toThrow('Foto not found');
    expect(fotoRepository.getFotoById).toHaveBeenCalledWith('notfound');
    expect(fotoRepository.deleteFoto).not.toHaveBeenCalled();
  });
});
