import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { PrincipalAtrativoService } from "@/services/principalAtrativoService";
import { connection } from "@/config/database/connection";
import type { IPrincipalAtrativoRepository } from "@/repositories/interfaces/IPrincipalAtrativoRepository";
import type { PrincipalAtrativo } from "@prisma/client";

jest.mock("@/config/database/connection", () => ({
  connection: {
    atracaoTuristica: {
      findUnique: jest.fn(),
    },
    principalAtrativo: {
      findUnique: jest.fn(),
    },
  },
}));

const basePrincipal: PrincipalAtrativo = {
  id: 1,
  posicao: 1,
  idAtracaoTuristica: 10,
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  updatedAt: new Date("2025-01-01T00:00:00.000Z"),
};

describe("PrincipalAtrativoService", () => {
  const repo: jest.Mocked<IPrincipalAtrativoRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findByPositions: jest.fn(),
    findAll: jest.fn(),
    findByAtracaoId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteByPositions: jest.fn(),
    count: jest.fn(),
  };

  const mockedConnection = connection as jest.Mocked<typeof connection>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("throws when posicao is out of range", async () => {
      const service = new PrincipalAtrativoService(repo);

      await expect(service.create(0, 10)).rejects.toThrow(
        "Posição deve estar entre 1 e 5"
      );
      await expect(service.create(6, 10)).rejects.toThrow(
        "Posição deve estar entre 1 e 5"
      );
    });

    it("throws when atracao turistica does not exist", async () => {
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce(null);
      const service = new PrincipalAtrativoService(repo);

      await expect(service.create(1, 10)).rejects.toThrow(
        "Atrativo turístico não encontrado"
      );
    });

    it("throws when atracao turistica is already principal", async () => {
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce({ id: 10 });
      repo.findByAtracaoId.mockResolvedValueOnce({ ...basePrincipal });
      const service = new PrincipalAtrativoService(repo);

      await expect(service.create(1, 10)).rejects.toThrow(
        "Este atrativo já está marcado como principal"
      );
    });

    it("deletes existing principal at same position before creating", async () => {
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce({ id: 10 });
      repo.findByAtracaoId.mockResolvedValueOnce(null);
      mockedConnection.principalAtrativo.findUnique.mockResolvedValueOnce({
        id: 99,
      } as PrincipalAtrativo);
      repo.delete.mockResolvedValueOnce({ ...basePrincipal, id: 99, posicao: 2 });
      repo.create.mockResolvedValueOnce({ ...basePrincipal, posicao: 2 });
      const service = new PrincipalAtrativoService(repo);

      const result = await service.create(2, 10);

      expect(repo.delete).toHaveBeenCalledWith(99);
      expect(repo.create).toHaveBeenCalledWith(2, 10);
      expect(result.posicao).toBe(2);
    });

    it("creates principal when validations pass", async () => {
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce({ id: 10 });
      repo.findByAtracaoId.mockResolvedValueOnce(null);
      mockedConnection.principalAtrativo.findUnique.mockResolvedValueOnce(null);
      repo.create.mockResolvedValueOnce({ ...basePrincipal });
      const service = new PrincipalAtrativoService(repo);

      const result = await service.create(1, 10);

      expect(repo.create).toHaveBeenCalledWith(1, 10);
      expect(result.id).toBe(basePrincipal.id);
    });
  });

  describe("update", () => {
    it("throws when principal does not exist", async () => {
      repo.findById.mockResolvedValueOnce(null);
      const service = new PrincipalAtrativoService(repo);

      await expect(service.update(1, 2)).rejects.toThrow(
        "Principal atrativo não encontrado"
      );
    });

    it("throws when posicao is out of range", async () => {
      repo.findById.mockResolvedValueOnce({ ...basePrincipal });
      const service = new PrincipalAtrativoService(repo);

      await expect(service.update(1, 0)).rejects.toThrow(
        "Posição deve estar entre 1 e 5"
      );
    });

    it("deletes existing principal at new position", async () => {
      repo.findById.mockResolvedValueOnce({ ...basePrincipal, id: 1, posicao: 1 });
      mockedConnection.principalAtrativo.findUnique.mockResolvedValueOnce({
        id: 55,
      } as PrincipalAtrativo);
      repo.delete.mockResolvedValueOnce({ ...basePrincipal, id: 55, posicao: 3 });
      repo.update.mockResolvedValueOnce({ ...basePrincipal, posicao: 3 });
      const service = new PrincipalAtrativoService(repo);

      const result = await service.update(1, 3);

      expect(repo.delete).toHaveBeenCalledWith(55);
      expect(repo.update).toHaveBeenCalledWith(1, 3, undefined);
      expect(result.posicao).toBe(3);
    });

    it("throws when new atracao turistica does not exist", async () => {
      repo.findById.mockResolvedValueOnce({ ...basePrincipal });
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce(null);
      const service = new PrincipalAtrativoService(repo);

      await expect(service.update(1, undefined, 11)).rejects.toThrow(
        "Atrativo turístico não encontrado"
      );
    });

    it("throws when new atracao turistica is already principal", async () => {
      repo.findById.mockResolvedValueOnce({ ...basePrincipal });
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce({ id: 11 });
      repo.findByAtracaoId.mockResolvedValueOnce({ ...basePrincipal, id: 2 });
      const service = new PrincipalAtrativoService(repo);

      await expect(service.update(1, undefined, 11)).rejects.toThrow(
        "Este atrativo já está marcado como principal"
      );
    });

    it("updates principal when validations pass", async () => {
      repo.findById.mockResolvedValueOnce({ ...basePrincipal });
      mockedConnection.principalAtrativo.findUnique.mockResolvedValueOnce(null);
      mockedConnection.atracaoTuristica.findUnique.mockResolvedValueOnce({ id: 11 });
      repo.findByAtracaoId.mockResolvedValueOnce(null);
      repo.update.mockResolvedValueOnce({ ...basePrincipal, posicao: 2, idAtracaoTuristica: 11 });
      const service = new PrincipalAtrativoService(repo);

      const result = await service.update(1, 2, 11);

      expect(repo.update).toHaveBeenCalledWith(1, 2, 11);
      expect(result.posicao).toBe(2);
      expect(result.idAtracaoTuristica).toBe(11);
    });
  });

  describe("totals", () => {
    it("returns max principals", async () => {
      const service = new PrincipalAtrativoService(repo);

      await expect(service.getMaxPrincipais()).resolves.toBe(5);
    });

    it("returns total principals from repository", async () => {
      repo.count.mockResolvedValueOnce(3);
      const service = new PrincipalAtrativoService(repo);

      await expect(service.getTotalPrincipais()).resolves.toBe(3);
    });
  });
});
