#!/bin/bash

echo "🔧 Testando configuração de upload no Docker..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    log_error "Docker não está rodando!"
    exit 1
fi

log_info "Docker está rodando ✓"

# Verificar se o container existe
if ! docker ps -a | grep -q "conecta_caparao_app"; then
    log_warn "Container conecta_caparao_app não encontrado"
    log_info "Execute primeiro: docker-compose up -d"
    exit 1
fi

# Verificar se o container está rodando
if ! docker ps | grep -q "conecta_caparao_app"; then
    log_error "Container conecta_caparao_app não está rodando"
    log_info "Execute: docker-compose up -d"
    exit 1
fi

log_info "Container está rodando ✓"

# Testar health check
log_info "Testando health check..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    log_info "Health check respondeu ✓"
    
    # Mostrar detalhes do health check
    echo ""
    echo "📊 Status do Health Check:"
    curl -s http://localhost:3000/api/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:3000/api/health
    echo ""
else
    log_error "Health check falhou ✗"
    log_info "Verificando logs do container..."
    docker logs --tail=20 conecta_caparao_app
fi

# Verificar pasta uploads no container
log_info "Verificando pasta uploads no container..."
if docker exec conecta_caparao_app ls -la /app/public/uploads > /dev/null 2>&1; then
    log_info "Pasta uploads existe ✓"
    echo ""
    echo "📁 Conteúdo da pasta uploads:"
    docker exec conecta_caparao_app ls -la /app/public/uploads
    echo ""
else
    log_error "Pasta uploads não encontrada ✗"
fi

# Testar criação de arquivo
log_info "Testando criação de arquivo de teste..."
if docker exec conecta_caparao_app touch /app/public/uploads/test.txt > /dev/null 2>&1; then
    log_info "Criação de arquivo funcionou ✓"
    docker exec conecta_caparao_app rm -f /app/public/uploads/test.txt
else
    log_error "Não foi possível criar arquivo de teste ✗"
fi

# Verificar volume Docker
log_info "Verificando volume Docker..."
if docker volume ls | grep -q "uploads_data"; then
    log_info "Volume uploads_data existe ✓"
    echo ""
    echo "🗂️  Informações do volume:"
    docker volume inspect conecta-caparao_uploads_data 2>/dev/null | head -10 || docker volume inspect conecta_caparao_uploads_data 2>/dev/null | head -10
    echo ""
else
    log_error "Volume uploads_data não encontrado ✗"
fi

# Mostrar logs recentes
echo ""
log_info "📋 Logs recentes do container:"
echo "----------------------------------------"
docker logs --tail=10 conecta_caparao_app
echo "----------------------------------------"

echo ""
log_info "🎉 Teste concluído!"
echo ""
echo "💡 Para testar upload completo:"
echo "   1. Acesse http://localhost:3000"
echo "   2. Faça login no painel admin"
echo "   3. Tente criar uma notícia com foto"
echo "   4. Verifique se a foto aparece corretamente"
echo ""
