#!/bin/bash

# Script de backup do banco de dados MySQL
# Execute este script regularmente via crontab para manter backups

set -e

# Configurações
BACKUP_DIR="/opt/conecta-caparao/backups"
DATE=$(date +%Y%m%d_%H%M%S)
COMPOSE_FILE="/opt/conecta-caparao/docker-compose.prod.yaml"
BACKUP_FILE="$BACKUP_DIR/conecta_caparao_backup_$DATE.sql"

# Criar diretório de backup se não existir
mkdir -p "$BACKUP_DIR"

echo "🗄️ Iniciando backup do banco de dados MySQL..."
echo "📅 Data: $(date)"
echo "📁 Arquivo: $BACKUP_FILE"

# Executar backup usando docker compose
docker compose -f "$COMPOSE_FILE" exec -T mysql mysqldump \
  -u root \
  -p"$MYSQL_ROOT_PASSWORD" \
  --single-transaction \
  --routines \
  --triggers \
  "$MYSQL_DATABASE" > "$BACKUP_FILE"

# Comprimir o backup
gzip "$BACKUP_FILE"

echo "✅ Backup concluído: ${BACKUP_FILE}.gz"

# Limpar backups antigos (manter apenas os últimos 7 dias)
find "$BACKUP_DIR" -name "conecta_caparao_backup_*.sql.gz" -mtime +7 -delete

echo "🧹 Backups antigos removidos (mantendo 7 dias)"
echo "📊 Backups disponíveis:"
ls -lh "$BACKUP_DIR"/conecta_caparao_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"

echo "🎉 Processo de backup finalizado!"