/**
 * Dados mock para testes
 */

import type { Categoria, Municipio, AtracaoTuristica, Evento, Usuario, PerfilCliente, Subcategoria } from '@prisma/client';
import { createTestDate } from './testUtils';

export const mockCategoria: Categoria = {
  id: 1,
  nome: 'Categoria Teste',
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockMunicipio: Municipio = {
  id: 1,
  nome: 'Município Teste',
  descricao: 'Descrição do município teste',
  site: 'https://municipio.teste.com',
  mapaUrl: 'https://maps.exemplo.com/municipio',
  idContato: 1,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockSubCategoria: Subcategoria = {
  id: 1,
  nome: 'SubCategoria Teste',
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockEndereco = {
  id: 1,
  rua: 'Rua Teste',
  numero: '123',
  bairro: 'Bairro Teste',
  cep: '12345-678',
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockContato = {
  id: 1,
  telefone: '(11) 99999-9999',
  celular: '(11) 88888-8888',
  email: 'teste@teste.com',
  instagram: '@teste',
  whatsapp: '11999999999',
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockAtracaoTuristica: AtracaoTuristica = {
  id: 1,
  nome: 'Atração Teste',
  descricao: 'Descrição da atração teste',
  mapaUrl: 'https://maps.exemplo.com',
  site: 'https://site.exemplo.com',
  idContato: 1,
  idEndereco: 1,
  idMunicipio: 1,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockEvento: Evento = {
  id: 1,
  nome: 'Evento Teste',
  descricao: 'Descrição do evento teste',
  data: createTestDate(30),
  idMunicipio: 1,
  idEndereco: 1,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockUsuario: Usuario = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'usuario@teste.com',
  senha: 'hashedPassword123',
  admin: false,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockPerfilCliente: PerfilCliente = {
  id: 1,
  nome: 'Perfil Cliente Teste',
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockFoto = {
  id: 1,
  url: 'https://exemplo.com/foto.jpg',
  capa: true,
  idAtracaoTuristica: 1,
  idEvento: null,
  idNoticia: null,
  idServicoTuristico: null,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockHorarioFuncionamento = {
  id: 1,
  diaSemana: 'Segunda-feira',
  horaAbertura: '08:00',
  horaFechamento: '18:00',
  fechado: false,
  idAtracaoTuristica: 1,
  idServicoTuristico: null,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockNoticia = {
  id: 1,
  titulo: 'Notícia Teste',
  resumo: 'Resumo da notícia teste',
  conteudo: 'Conteúdo completo da notícia teste',
  dataPublicacao: createTestDate(0),
  idMunicipio: 1,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};

export const mockServicoTuristico = {
  id: 1,
  nome: 'Serviço Turístico Teste',
  descricao: 'Descrição do serviço turístico teste',
  site: 'https://servico.exemplo.com',
  idCategoria: 1,
  idMunicipio: 1,
  idEndereco: 1,
  idContato: 1,
  createdAt: createTestDate(0),
  updatedAt: createTestDate(0),
};
