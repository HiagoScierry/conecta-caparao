from --platform=arm64 node:22.11-alpine

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000