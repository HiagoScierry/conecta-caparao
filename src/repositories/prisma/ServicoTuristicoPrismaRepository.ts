import { connection } from "@/config/database/connection";
import { IServicoTuristicoRepository, ServicoTuristicoWithRelations } from "../interfaces/IServicoTuristicoRepository";
import { ServicoTuristico } from "@prisma/client";

export class ServicoTuristicoPrismaRepository implements IServicoTuristicoRepository {
  async findById(id: number): Promise<ServicoTuristico> {
    const servicoTuristico = await connection.servicoTuristico.findUnique({
      where: { id },
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        fotos: {
          include: {
            foto: true,
          }
        },
        horarios: true,
      }
    });

    if (!servicoTuristico) {
      throw new Error(`ServicoTuristico with id ${id} not found`);
    }

    return servicoTuristico;
  }

  async findAll(): Promise<ServicoTuristico[]> {
    return connection.servicoTuristico.findMany({
      include: {
        contato: true,
        endereco: true,
        municipio: true,
        fotos: {
          include: {
            foto: true,
          }
        },
        horarios: true,
      }
    });
  }

  async create(data: ServicoTuristicoWithRelations, fotosURL?: string): Promise<ServicoTuristico> {
    console.log("Fotos URL recebidas:", fotosURL);

    const servicoTuristico = await connection.servicoTuristico.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        site: data.site,
        idContato: data.idContato,
        idEndereco: data.idEndereco,
        idMunicipio: data.idMunicipio,
      }
    });

    // Criar foto associada ao serviço, se fornecida
    if (fotosURL) {
      const foto = await connection.foto.create({
        data: {
          url: fotosURL,
        }
      });
      
      await connection.galeriaFoto.create({
        data: {
          idFoto: foto.id,
          servicoTuristicoId: servicoTuristico.id,
          capa: true, // primeira foto como capa
        }
      });
      
      console.log("Foto criada e associada ao serviço:", servicoTuristico.id);
    }

    return servicoTuristico;
  }

  async update(id: number, data: ServicoTuristicoWithRelations, fotosURL?: string): Promise<ServicoTuristico> {
    if (fotosURL) {
      // Buscar se esta foto já existe na galeria deste serviço
      const galeriaExistente = await connection.galeriaFoto.findFirst({
        where: { 
          servicoTuristicoId: id,
          foto: {
            url: fotosURL
          }
        },
        include: { foto: true }
      });

      // Só adicionar a foto se ela não existir na galeria deste serviço
      if (!galeriaExistente) {
        // Verificar se a foto já existe na tabela foto
        let foto = await connection.foto.findFirst({
          where: { url: fotosURL }
        });

        // Se a foto não existe, criar ela
        if (!foto) {
          foto = await connection.foto.create({
            data: { url: fotosURL },
          });
        }
        
        // Criar a relação na galeria
        await connection.galeriaFoto.create({
          data: {
            idFoto: foto.id,
            servicoTuristicoId: id,
            capa: false, // Não substituir a capa existente
          }
        });
      }
    }

    const updatedServicoTuristico = await connection.servicoTuristico.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        site: data.site,
        idContato: data.idContato,
        idEndereco: data.idEndereco,
        idMunicipio: data.idMunicipio,
      }
    });

    return updatedServicoTuristico;
  }

  async delete(id: number): Promise<void> {
    await connection.servicoTuristico.delete({ where: { id } });
  }

}