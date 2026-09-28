#!/bin/bash

set -e

echo "======================================"
echo "  Configuração do projeto WebdriverIO"
echo "======================================"

# 1. Verificar Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não está instalado."
    echo "Instale o Node.js antes de continuar."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# 2. Verificar npm
if ! command -v npm &> /dev/null
then
    echo "❌ npm não está instalado."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"

# 3. Instalar dependências
echo ""
echo "📦 Instalando dependências..."

npm install

echo "✅ Dependências instaladas."

# 4. Configurar variáveis de ambiente
echo ""
echo "🔐 Verificando arquivo .env..."

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Arquivo .env criado a partir do .env.example."
        echo "⚠️ Preencha as variáveis de ambiente antes de executar os testes."
    else
        echo "⚠️ Arquivo .env.example não encontrado."
        echo "Crie o arquivo .env manualmente antes de executar os testes."
    fi
else
    echo "✅ Arquivo .env já existe."
fi

# 5. Criar diretório de resultados do Allure
echo ""
echo "📁 Verificando diretório do Allure..."

mkdir -p allure-results

echo "✅ Diretório allure-results verificado."

# 6. Finalização
echo ""
echo "======================================"
echo "✅ Ambiente configurado com sucesso!"
echo "======================================"

echo ""
echo "Antes da execução, confira o arquivo .env."

echo ""
echo "Para executar os testes localmente:"
echo "  npm run wdio"

echo ""
echo "Para executar os testes no LambdaTest:"
echo "  npm run wdio:cloud"

echo ""
echo "Para gerar o Allure Report:"
echo "  npm run allure:generate"

echo ""
echo "Para abrir o Allure Report:"
echo "  npm run allure:open"