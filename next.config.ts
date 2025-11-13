import type { NextConfig } from "next";

// Função para configurar automaticamente os domínios de imagem
function getImageDomains() {
  const uploadType = process.env.UPLOAD_TYPE;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const region = process.env.AWS_REGION || 'us-east-1';
  const customBaseUrl = process.env.AWS_S3_BASE_URL;
  
  const domains = [];

  // Adiciona domínios S3 se estiver usando S3
  if (uploadType === 's3' && bucketName) {
    domains.push(
      {
        protocol: 'https' as const,
        hostname: `${bucketName}.s3.${region}.amazonaws.com`,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: `${bucketName}.s3.amazonaws.com`,
        port: '',
        pathname: '/**',
      }
    );
  }

  // Adiciona URL personalizada (ex: CloudFront) se configurada
  if (customBaseUrl) {
    try {
      const url = new URL(customBaseUrl);
      domains.push({
        protocol: url.protocol.replace(':', '') as 'https' | 'http',
        hostname: url.hostname,
        port: url.port,
        pathname: '/**',
      });
    } catch {
      console.warn('URL base personalizada inválida:', customBaseUrl);
    }
  }

  return domains;
}

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      ...getImageDomains(),
      // Adicione outros domínios de imagem estáticos aqui se necessário
      // Exemplo:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;

