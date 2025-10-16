/**
 * Utilitários comuns para testes
 */

import { jest } from '@jest/globals';

/**
 * Helper para criar mocks de repositórios
 */
export const createRepositoryMock = <T extends Record<string, unknown>>(): jest.Mocked<T> => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<T>;
};

/**
 * Helper para criar dados de teste com valores padrão
 */
export const createTestData = <T>(data: Partial<T>, defaults: T): T => {
  return { ...defaults, ...data };
};

/**
 * Helper para gerar datas para testes
 */
export const createTestDate = (offset: number = 0): Date => {
  const baseDate = new Date('2024-01-01T00:00:00Z');
  return new Date(baseDate.getTime() + offset * 24 * 60 * 60 * 1000);
};

/**
 * Helper para limpar todos os mocks
 */
export const clearAllMocks = () => {
  jest.clearAllMocks();
};

/**
 * Helper para validar estrutura AAA em testes
 */
export const validateAAAPattern = {
  arrange: (description: string) => `// Arrange - ${description}`,
  act: (description: string) => `// Act - ${description}`,
  assert: (description: string) => `// Assert - ${description}`,
};
