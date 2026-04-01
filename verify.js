#!/usr/bin/env node

/**
 * Webcole 2026 - Quick Verification Script
 * Verifica que todos los componentes están en su lugar
 */

import fs from 'fs';
import path from 'path';

const checks = [];

function check(name, condition) {
  checks.push({ name, pass: condition });
  const icon = condition ? '✅' : '❌';
  console.log(`${icon} ${name}`);
}

console.log('\n📋 VERIFICACIÓN RÁPIDA - WEBCOLE 2026\n');

// Check files
const requiredFiles = [
  'src/App.jsx',
  'src/App.css',
  'src/index.css',
  'src/main.jsx',
  'src/data/products.js',
  'src/context/CartContext.jsx',
  'package.json',
  'vite.config.js'
];

console.log('📁 Archivos críticos:');
requiredFiles.forEach(file => {
  check(`  ${file}`, fs.existsSync(file));
});

// Check components
console.log('\n🔹 Componentes:');
const componentFiles = [
  'src/components/ProductCard.jsx',
  'src/components/CartDrawer.jsx',
  'src/components/Footer.jsx'
];
componentFiles.forEach(file => {
  check(`  ${file}`, fs.existsSync(file));
});

// Check pages
console.log('\n📄 Páginas:');
const pageFiles = [
  'src/pages/Home.jsx',
  'src/pages/Product.jsx',
  'src/pages/Cart.jsx',
  'src/pages/About.jsx',
  'src/pages/Contact.jsx',
  'src/pages/FAQ.jsx',
  'src/pages/Categories.jsx'
];
pageFiles.forEach(file => {
  check(`  ${file}`, fs.existsSync(file));
});

// Check SVG assets
console.log('\n🖼️ SVG Assets (37 esperados):');
const imagesDir = 'public/images';
let svgCount = 0;
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  svgCount = files.filter(f => f.endsWith('.svg')).length;
}
check(`  ${svgCount}/37 SVGs en public/images/`, svgCount >= 37);

// Check documentation
console.log('\n📚 Documentación:');
const docFiles = [
  'DOCS_INDEX.md',
  'QUICK_START.md',
  'DEPLOYMENT_STATUS.md',
  'CHANGELOG.md',
  'SUMMARY.md',
  'README.md'
];
docFiles.forEach(file => {
  check(`  ${file}`, fs.existsSync(file));
});

// Check products data
console.log('\n🛒 Datos de Productos:');
try {
  const productsPath = 'src/data/products.js';
  if (fs.existsSync(productsPath)) {
    const content = fs.readFileSync(productsPath, 'utf-8');
    const productCount = (content.match(/id: '/g) || []).length;
    check(`  ${productCount} productos en products.js`, productCount >= 37);
  }
} catch (e) {
  check(`  productos.js legible`, false);
}

// Summary
console.log('\n═══════════════════════════════════════════════════');
const passed = checks.filter(c => c.pass).length;
const total = checks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`\n✨ RESULTADO: ${passed}/${total} checks passed (${percentage}%)\n`);

if (percentage === 100) {
  console.log('🎉 ¡TODO VERIFICADO! Webcole 2026 está listo.\n');
  console.log('Próximos pasos:');
  console.log('  1. npm install');
  console.log('  2. npm run dev');
  console.log('  3. Abrir http://localhost:5176');
  console.log('\nPara producción:');
  console.log('  npm run build');
  console.log('  npm run preview\n');
} else {
  console.log('⚠️  Algunos archivos están faltando. Por favor verifica.');
}

console.log('═══════════════════════════════════════════════════\n');
