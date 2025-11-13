import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LocalUpload } from '../../lib/upload/LocalUpload';
import { S3Upload } from '../../lib/upload/S3Upload';

// Mock do AWS SDK
jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({
    send: jest.fn()
  })),
  PutObjectCommand: jest.fn(),
  GetObjectCommand: jest.fn(),
}));

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn()
}));

// Mock do fs
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  promises: {
    writeFile: jest.fn()
  }
}));

describe('Upload Library', () => {
  const testFileName = 'test-file.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.AWS_S3_BUCKET_NAME;
    delete process.env.AWS_REGION;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
  });

  describe('LocalUpload', () => {
    let localUpload: LocalUpload;

    beforeEach(() => {
      localUpload = new LocalUpload();
    });

    it('should get file URL correctly', () => {
      const url = localUpload.getFileUrl(testFileName);
      expect(url).toBe(`/uploads/${testFileName}`);
    });
  });

  describe('S3Upload', () => {
    beforeEach(() => {
      // Set required environment variables
      process.env.AWS_S3_BUCKET_NAME = 'test-bucket';
      process.env.AWS_REGION = 'us-east-1';
      process.env.AWS_ACCESS_KEY_ID = 'test-key';
      process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
    });

    it('should create S3Upload instance with required environment variables', () => {
      expect(() => new S3Upload()).not.toThrow();
    });

    it('should throw error when AWS_S3_BUCKET_NAME is not provided', () => {
      delete process.env.AWS_S3_BUCKET_NAME;
      
      expect(() => new S3Upload())
        .toThrow('AWS_S3_BUCKET_NAME environment variable is required');
    });

    it('should get file URL correctly', () => {
      const s3Upload = new S3Upload();
      const url = s3Upload.getFileUrl(testFileName);
      
      expect(url).toBe(`https://test-bucket.s3.us-east-1.amazonaws.com/${testFileName}`);
    });

    it('should use custom base URL when provided', () => {
      process.env.AWS_S3_BASE_URL = 'https://cdn.example.com';
      const s3Upload = new S3Upload();
      
      const url = s3Upload.getFileUrl(testFileName);
      
      expect(url).toBe(`https://cdn.example.com/${testFileName}`);
    });
  });

  describe('Index module', () => {
    it('should export required functions and classes', async () => {
      const { uploadDir, getFileUrl, LocalUpload, S3Upload } = await import('../../lib/upload/index');
      
      expect(uploadDir).toBeDefined();
      expect(getFileUrl).toBeDefined();
      expect(LocalUpload).toBeDefined();
      expect(S3Upload).toBeDefined();
    });
  });
});