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

# 4. Criar diretórios necessários
echo ""
echo "📁 Verificando diretórios..."

mkdir -p screenshots
mkdir -p allure-results
mkdir -p allure-report

echo "✅ Diretórios verificados."

# 5. Finalização
echo ""
echo "======================================"
echo "✅ Ambiente configurado com sucesso!"
echo "======================================"

echo ""
echo "Para executar os testes:"
echo "  npm run wdio"

echo ""
echo "Para executar o Allure Report:"
echo "  npx allure open allure-report"