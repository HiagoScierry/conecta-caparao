This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
∑
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy na VPS (Docker Compose + Nginx)

A aplicação sobe via `docker-compose.yaml` com um container `nginx` na frente,
fazendo proxy reverso para o container `app` (porta 3000, interna). O nginx é
o único serviço que expõe porta ao host (`HTTP_PORT`, padrão `80`).

```bash
cp .env.example .env
# edite o .env com os valores reais (senhas, JWT_SECRET, etc.)

docker compose up -d --build
```

Acesse `http://<ip-da-vps>`.

### Habilitando HTTPS depois que o domínio estiver definido

1. Aponte o(s) registro(s) DNS (A/AAAA) do domínio para o IP da VPS.
2. Em `nginx/conf.d/default.conf`, troque `server_name _;` pelo domínio
   (ex: `server_name conectacaparao.com.br www.conectacaparao.com.br;`).
3. Instale o Certbot (plugin nginx) e emita o certificado, por exemplo rodando
   `certbot --nginx` no host (ou via container `certbot/certbot` apontando
   para o volume de `nginx/conf.d`) — o Certbot ajusta o `server` block para
   redirecionar 80 → 443 e adiciona o bloco `listen 443 ssl`.
4. Publique a porta 443 no serviço `nginx` do `docker-compose.yaml`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
