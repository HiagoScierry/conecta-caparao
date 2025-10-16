import { MunicipioService } from '@/services/municipioService';
import { IMunicipioRepository, MunicipioFull } from '@/repositories/interfaces/IMunicipioRepository';
import { MunicipioDTO } from '@/dto/municipioDTO';
import { Municipio, Contato, Foto } from '@prisma/client';

describe('MunicipioService', () => {
  let municipioService: MunicipioService;
  let municipioRepository: jest.Mocked<IMunicipioRepository>;

  const fakeMunicipio: Municipio = {
    nome: 'Vitória',
    descricao: 'Capital do Espírito Santo',
    site: "http://example.com",
    mapaUrl: "http://example.com/mapa",
    id: 1,
    idContato: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const fakeContato: Contato = {
    id: 1,
    email: 'test@test.com',
    celular: '1234567890',
    telefone: '1234567890',
    whatsapp: '1234567890',
    instagram: '@test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const fakeFoto: Foto = {
    id: 1,
    url: 'http://example.com/foto.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const fakeMunicipioFull: MunicipioFull = {
    ...fakeMunicipio,
    contato: fakeContato,
    fotos: [fakeFoto],
  };

  const dto: MunicipioDTO = {
    nome: 'Vitória',
    descricao: 'Capital do Espírito Santo',
  };

  beforeEach(() => {
    municipioRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    municipioService = new MunicipioService(municipioRepository);
  });

  it('should create a municipio', async () => {
    municipioRepository.create.mockResolvedValue(fakeMunicipio);

    const result = await municipioService.create(dto, 123, []);

    expect(municipioRepository.create).toHaveBeenCalledWith(dto, 123, []);
    expect(result).toEqual(fakeMunicipio);
  });

  it('should return municipio by id', async () => {
    municipioRepository.findById.mockResolvedValue(fakeMunicipioFull);

    const result = await municipioService.findById('1');

    expect(municipioRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(fakeMunicipioFull);
  });

  it('should return all municipios', async () => {
    municipioRepository.findAll.mockResolvedValue([fakeMunicipioFull]);

    const result = await municipioService.findAll();

    expect(municipioRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([fakeMunicipioFull]);
  });

  it('should update a municipio', async () => {
    const updatedMunicipio = { ...fakeMunicipio, nome: 'Vila Velha' };
    municipioRepository.update.mockResolvedValue(updatedMunicipio);

    const result = await municipioService.update('1', { nome: 'Vila Velha', descricao: 'Cidade histórica' }, []);

    expect(municipioRepository.update).toHaveBeenCalledWith('1', { nome: 'Vila Velha', descricao: 'Cidade histórica' }, []);
    expect(result).toEqual(updatedMunicipio);
  });

  it('should delete a municipio', async () => {
    municipioRepository.delete.mockResolvedValue();

    await municipioService.delete('1');

    expect(municipioRepository.delete).toHaveBeenCalledWith('1');
  });
});

