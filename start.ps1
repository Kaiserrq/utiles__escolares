# 🚀 Webcole 2026 - Startup Script (PowerShell)

Clear-Host

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              WEBCOLE 2026 - TU LISTA CON CLICK        ║" -ForegroundColor Cyan
Write-Host "║                Útiles Escolares Digitales             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
}

# Show menu
Write-Host "🎯 Selecciona una opción:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1) npm run dev       - Servidor desarrollo (http://localhost:5176)" -ForegroundColor White
Write-Host "  2) npm run build     - Compilar para producción" -ForegroundColor White
Write-Host "  3) npm run preview   - Preview producción" -ForegroundColor White
Write-Host "  4) npm run lint      - Verificar código (ESLint)" -ForegroundColor White
Write-Host "  5) node verify.js    - Verificar proyecto" -ForegroundColor White
Write-Host "  6) Ver documentación - Mostrar archivos" -ForegroundColor White
Write-Host "  7) Salir" -ForegroundColor White
Write-Host ""

$option = Read-Host "Escribe número (1-7)"

switch ($option) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Iniciando servidor development..." -ForegroundColor Green
        Write-Host "Abre navegador en: http://localhost:5176/" -ForegroundColor Yellow
        Write-Host ""
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "🔨 Compilando para producción..." -ForegroundColor Green
        npm run build
        Write-Host "✅ Build completado en dist/" -ForegroundColor Green
    }
    "3" {
        Write-Host ""
        Write-Host "👁️  Preview de producción..." -ForegroundColor Green
        Write-Host "Abre navegador en: http://localhost:4173/" -ForegroundColor Yellow
        npm run preview
    }
    "4" {
        Write-Host ""
        Write-Host "🔍 Verificando código..." -ForegroundColor Green
        npm run lint
    }
    "5" {
        Write-Host ""
        Write-Host "✅ Verificando proyecto..." -ForegroundColor Green
        node verify.js
    }
    "6" {
        Clear-Host
        Write-Host ""
        Write-Host "📚 DOCUMENTACIÓN DISPONIBLE:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "PRINCIPAL:" -ForegroundColor Yellow
        Write-Host "  → DOCS_INDEX.md        Índice Central (LEER PRIMERO)" -ForegroundColor White
        Write-Host ""
        Write-Host "GUÍAS:" -ForegroundColor Yellow
        Write-Host "  → QUICK_START.md       Guía rápida desarrollo" -ForegroundColor White
        Write-Host "  → DEPLOYMENT_STATUS.md Estado 2026 completo" -ForegroundColor White
        Write-Host "  → SUMMARY.md           Resumen visual" -ForegroundColor White
        Write-Host ""
        Write-Host "REFERENCIA:" -ForegroundColor Yellow
        Write-Host "  → CHANGELOG.md         Historial de cambios" -ForegroundColor White
        Write-Host "  → DELIVERY.md          Checklist entrega" -ForegroundColor White
        Write-Host "  → MANIFEST.md          Lista archivos" -ForegroundColor White
        Write-Host ""
        Write-Host "PROYECTO:" -ForegroundColor Yellow
        Write-Host "  → README.md            Documentación original" -ForegroundColor White
        Write-Host ""
        Write-Host "Para abrir un archivo:"
        Write-Host "  code DOCS_INDEX.md" -ForegroundColor Gray
        Write-Host ""
    }
    "7" {
        Write-Host ""
        Write-Host "¡Hasta luego!" -ForegroundColor Green
        exit
    }
    default {
        Write-Host "Opción no válida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "═════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "📞 Webcole 2026 | Email: soporte@webcole.edu.pe" -ForegroundColor Gray
Write-Host "═════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
