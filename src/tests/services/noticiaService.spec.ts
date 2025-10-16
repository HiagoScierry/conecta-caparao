import { NoticiaService } from "@/services/noticiaService";
import { INoticiaRepository, NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";
import { NoticiaDTO } from "@/dto/noticiaDTO";
import { Noticia } from "@prisma/client";

const mockNoticiaRepository: jest.Mocked<INoticiaRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("NoticiaService", () => {
  let noticiaService: NoticiaService;

  beforeEach(() => {
    noticiaService = new NoticiaService(mockNoticiaRepository);
    jest.clearAllMocks();
  });

  const mockNoticiaFull: NoticiaFull = {
    id: 1,
    titulo: "Test",
    texto: "Content",
    data: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    fotos: []
  };

  describe("findAll", () => {
    it("should return all news", async () => {
      // Arrange
      const news = [mockNoticiaFull];
      mockNoticiaRepository.findAll.mockResolvedValue(news);

      // Act
      const result = await noticiaService.findAll();

      // Assert
      expect(mockNoticiaRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(news);
    });
  });

  describe("findById", () => {
    it("should return a news item by ID", async () => {
      // Arrange
      mockNoticiaRepository.findById.mockResolvedValue(mockNoticiaFull);

      // Act
      const result = await noticiaService.findById(1);

      // Assert
      expect(mockNoticiaRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockNoticiaFull);
    });
  });

  describe("create", () => {
    it("should create a new news item", async () => {
      // Arrange
      const dto: NoticiaDTO = {
        titulo: "New News",
        texto: "News content",
        data: "2023-10-16"
      };
      const fotosUrl = ["foto1.jpg", "foto2.jpg"];
      mockNoticiaRepository.create.mockResolvedValue(mockNoticiaFull);

      // Act
      const result = await noticiaService.create(dto, fotosUrl);

      // Assert
      expect(mockNoticiaRepository.create).toHaveBeenCalledWith(dto, fotosUrl);
      expect(result).toEqual(mockNoticiaFull);
    });
  });

  describe("update", () => {
    it("should update an existing news item", async () => {
      // Arrange
      const dto: NoticiaDTO = {
        titulo: "Updated Title",
        texto: "Updated Content",
        data: "2023-10-16"
      };
      const fotosUrl = ["foto1.jpg"];
      const updatedNews: Noticia = {
        id: 1,
        titulo: "Updated Title",
        texto: "Updated Content",
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockNoticiaRepository.update.mockResolvedValue(updatedNews);

      // Act
      const result = await noticiaService.update(1, dto, fotosUrl);

      // Assert
      expect(mockNoticiaRepository.update).toHaveBeenCalledWith(1, dto, fotosUrl);
      expect(result).toEqual(updatedNews);
    });
  });

  describe("delete", () => {
    it("should delete a news item by ID", async () => {
      // Arrange
      mockNoticiaRepository.delete.mockResolvedValue(undefined);

      // Act
      const result = await noticiaService.delete(1);

      // Assert
      expect(mockNoticiaRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
