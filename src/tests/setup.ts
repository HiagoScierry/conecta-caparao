/**
 * Configuração global de setup para testes
 * Este arquivo é executado antes de todos os testes
 */

import { jest } from '@jest/globals';

// Mock global do console para testes mais limpos
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  // Mock de console.log para testes, mas mantém error e warn
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: originalConsole.warn,
  error: originalConsole.error,
};

// Mock global de Date para testes determinísticos
const mockDate = new Date('2024-01-01T00:00:00Z');
global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
global.Date.now = jest.fn(() => mockDate.getTime());

// Configurações globais de timeout para testes assíncronos
jest.setTimeout(10000);

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Restaurar mocks após todos os testes
afterAll(() => {
  jest.restoreAllMocks();
  global.console = originalConsole;
});
