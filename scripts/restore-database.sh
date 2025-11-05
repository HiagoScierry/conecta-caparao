#!/bin/bash

# Script de restore do banco de dados MySQL
# Use este script para restaurar um backup específico

set -e

# Verificar se foi fornecido o arquivo de backup
if [ $# -eq 0 ]; then
    echo "❌ Uso: $0 <arquivo_backup.sql.gz>"
    echo "📁 Backups disponíveis:"
    ls -lh /opt/conecta-caparao/backups/conecta_caparao_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"
    exit 1
fi

BACKUP_FILE="$1"
COMPOSE_FILE="/opt/conecta-caparao/docker-compose.prod.yaml"

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Arquivo de backup não encontrado: $BACKUP_FILE"
    exit 1
fi

echo "🔄 Iniciando restore do banco de dados MySQL..."
echo "📅 Data: $(date)"
echo "📁 Arquivo: $BACKUP_FILE"

# Confirmar a operação
echo "⚠️  ATENÇÃO: Esta operação irá SUBSTITUIR todos os dados atuais do banco!"
echo "🔍 Tem certeza que deseja continuar? (digite 'sim' para confirmar)"
read -r confirmation

if [ "$confirmation" != "sim" ]; then
    echo "❌ Operação cancelada pelo usuário"
    exit 0
fi

# Parar a aplicação para evitar inconsistências
echo "🛑 Parando aplicação..."
docker compose -f "$COMPOSE_FILE" stop app

# Executar restore
echo "🔄 Executando restore..."
if [[ "$BACKUP_FILE" == *.gz ]]; then
    # Arquivo comprimido
    zcat "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T mysql mysql \
        -u root \
        -p"$MYSQL_ROOT_PASSWORD" \
        "$MYSQL_DATABASE"
else
    # Arquivo não comprimido
    cat "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T mysql mysql \
        -u root \
        -p"$MYSQL_ROOT_PASSWORD" \
        "$MYSQL_DATABASE"
fi

# Reiniciar a aplicação
echo "🚀 Reiniciando aplicação..."
docker compose -f "$COMPOSE_FILE" start app

echo "✅ Restore concluído com sucesso!"
echo "🎉 Aplicação reiniciada e funcionando"