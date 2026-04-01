#!/bin/bash

# 🚀 Webcole 2026 - Startup Script

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              WEBCOLE 2026 - TU LISTA CON CLICK        ║"
echo "║                Útiles Escolares Digitales             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas"
    echo ""
fi

# Show menu
echo "🎯 Selecciona una opción:"
echo ""
echo "  1) npm run dev       - Servidor desarrollo (http://localhost:5176)"
echo "  2) npm run build     - Compilar para producción"
echo "  3) npm run preview   - Preview producción"
echo "  4) npm run lint      - Verificar código (ESLint)"
echo "  5) node verify.js    - Verificar proyecto"
echo "  6) Ver documentación - Abrir DOCS_INDEX.md"
echo ""
echo -n "Escribe número (1-6): "
read option

case $option in
    1)
        echo ""
        echo "🚀 Iniciando servidor development..."
        echo "Abre navegador en: http://localhost:5176/"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 Compilando para producción..."
        npm run build
        echo "✅ Build completado en dist/"
        ;;
    3)
        echo ""
        echo "👁️  Preview de producción..."
        echo "Abre navegador en: http://localhost:4173/"
        npm run preview
        ;;
    4)
        echo ""
        echo "🔍 Verificando código..."
        npm run lint
        ;;
    5)
        echo ""
        echo "✅ Verificando proyecto..."
        node verify.js
        ;;
    6)
        echo ""
        echo "📚 Documentación principal:"
        echo "  → DOCS_INDEX.md (Índice)"
        echo "  → QUICK_START.md (Guía desarrollo)"
        echo "  → DEPLOYMENT_STATUS.md (Estado actual)"
        echo "  → MANIFEST.md (Archivos entregados)"
        echo ""
        echo "Abre uno de estos archivos con tu editor de texto."
        ;;
    *)
        echo "Opción no válida"
        ;;
esac

echo ""
