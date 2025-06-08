import { NoticiaService } from "@/services/noticiaService";
import { INoticiaRepository } from "@/repositories/interfaces/INoticiaRepository";
import { NoticiaDTO } from "@/dto/noticiaDTO";

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

  describe("findAll", () => {
    it("should return all news", async () => {
      // Arrange
      const news = [{
        id: 1,
        titulo: "Test",
        texto: "Content",
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }];
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
      const newsItem = {
        id: 1,
        titulo: "Test",
        texto: "Content",
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockNoticiaRepository.findById.mockResolvedValue(newsItem);

      // Act
      const result = await noticiaService.findById(1);

      // Assert
      expect(mockNoticiaRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(newsItem);
    });
  });

  describe("create", () => {
    it("should create a new news item", async () => {
      // Arrange
      const dto = {
        titulo: "New News",
        texto: "News content",
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        fotos: [],
        idEndereco: 1,
        idMunicipio: 1,
      };
      const createdNews = { id: 1, ...dto };
      mockNoticiaRepository.create.mockResolvedValue(createdNews);

      // Act
      const result = await noticiaService.create(dto);

      // Assert
      expect(mockNoticiaRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdNews);
    });
  });

  describe("update", () => {
    it("should update an existing news item", async () => {
      // Arrange
      const dto = {
        titulo: "Updated Title",
        texto: "Updated Content",
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        fotos: [],
        idEndereco: 1,
        idMunicipio: 1,
      };
      const updatedNews = { id: 1, ...dto };
      mockNoticiaRepository.update.mockResolvedValue(updatedNews);

      // Act
      const result = await noticiaService.update(1, dto);

      // Assert
      expect(mockNoticiaRepository.update).toHaveBeenCalledWith(1, dto);
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
