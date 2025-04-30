import { ContatoService } from '@/services/contatoService';
import { IContatoRepository } from '@/repositories/interfaces/IContatoRepository';

describe('ContatoService (com mocks)', () => {
  let contatoService: ContatoService;
  let contatoRepository: jest.Mocked<IContatoRepository>;

  const fakeContato = {
    id: 1,
    email: 'test@mail.com',
    celular: '1234567890',
    telefone: '1234567890',
    whatsapp: '1234567890',
    instagram: '@test',
  };

  beforeEach(() => {
    contatoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    contatoService = new ContatoService(contatoRepository);
  });

  it('should create a new contato', async () => {
    contatoRepository.create.mockResolvedValue(fakeContato);
    contatoRepository.findById.mockResolvedValue(fakeContato);

    const created = await contatoService.create(fakeContato);
    const found = await contatoRepository.findById(created.id!);

    expect(contatoRepository.create).toHaveBeenCalledWith(fakeContato);
    expect(created).toEqual(fakeContato);
    expect(found).toEqual(fakeContato);
  });

  it('should return all contatos', async () => {
    contatoRepository.findAll.mockResolvedValue([fakeContato, fakeContato]);

    const contatos = await contatoService.findAll();

    expect(contatoRepository.findAll).toHaveBeenCalled();
    expect(contatos).toHaveLength(2);
  });

  it('should update a contato', async () => {
    const updatedContato = {
      ...fakeContato,
      email: 'updated@mail.com',
    };

    // Simula que o contato existe
    contatoRepository.findById.mockResolvedValue(fakeContato);
    contatoRepository.update.mockResolvedValue(updatedContato);

    const result = await contatoService.update(updatedContato);

    expect(contatoRepository.findById).toHaveBeenCalledWith(updatedContato.id);
    expect(contatoRepository.update).toHaveBeenCalledWith(updatedContato);
    expect(result.email).toBe('updated@mail.com');
  });

  it('should delete a contato', async () => {
    contatoRepository.findById.mockResolvedValue(fakeContato); // Simula existência
    contatoRepository.delete.mockResolvedValue();

    await contatoService.delete(fakeContato.id);

    expect(contatoRepository.findById).toHaveBeenCalledWith(fakeContato.id);
    expect(contatoRepository.delete).toHaveBeenCalledWith(fakeContato.id);
  });
});
