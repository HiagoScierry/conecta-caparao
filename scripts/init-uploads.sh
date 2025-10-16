#!/bin/sh

# Script para inicializar a pasta de uploads no container
echo "Inicializando pasta de uploads..."

UPLOADS_DIR="/app/public/uploads"
USER_ID=$(id -u nextjs)
GROUP_ID=$(id -g nodejs)

echo "Usuario nextjs ID: $USER_ID"
echo "Grupo nodejs ID: $GROUP_ID"

# Criar a pasta se não existir
if [ ! -d "$UPLOADS_DIR" ]; then
    echo "Criando diretório: $UPLOADS_DIR"
    mkdir -p "$UPLOADS_DIR"
fi

# Verificar se executando como root para ajustar permissões
if [ "$(id -u)" = "0" ]; then
    echo "Executando como root, definindo permissões..."
    chown -R $USER_ID:$GROUP_ID "$UPLOADS_DIR"
    chmod -R 755 "$UPLOADS_DIR"
else
    echo "Executando como usuário não-root, verificando permissões..."
    ls -la "$UPLOADS_DIR"
fi

echo "Pasta de uploads inicializada com sucesso!"
echo "Conteúdo da pasta uploads:"
ls -la "$UPLOADS_DIR"

# Executar o comando original
exec "$@"
