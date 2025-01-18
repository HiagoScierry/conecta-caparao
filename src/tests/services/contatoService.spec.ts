
import { ContatoDTO } from "@/dto/contatoDTO";
import { ContatoRepositoryInMemory } from "@/repositories/inMemory/ContatoRepositoryInMemory";
import { IContatoRepository } from "@/repositories/interfaces/IContatoRepository";
import { ContatoService } from "@/services/contatoService";

describe('ContatoService', () => {
  let contatoRepository: IContatoRepository;
  let contatoService: ContatoService;

  beforeEach(() => {
    contatoRepository = new ContatoRepositoryInMemory();
    contatoService = new ContatoService(contatoRepository);
  })

  it('should be able to create a contatoService instance', async () => {
    expect(contatoService).toBeInstanceOf(ContatoService);
  });

  it('should be able to create a new contato', async () => {
    const contato: ContatoDTO = {
      email: 'test@mail.com',
      celular: '1234567890',
      telefone: '1234567890',
      whatsapp: '1234567890',
      instagram: '@test'
    };

    const { id } = await contatoService.create(contato);

    const newContato = await contatoRepository.findById(id as number);

    expect(newContato).toBeDefined();

    expect(newContato).toHaveProperty('id');
    expect(newContato?.celular).toBe(contato.celular);
    expect(newContato?.email).toBe(contato.email);
    expect(newContato?.telefone).toBe(contato.telefone);
    expect(newContato?.whatsapp).toBe(contato.whatsapp);
    expect(newContato?.instagram).toBe(contato.instagram);

  });

});