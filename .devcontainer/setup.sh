#!/bin/bash
set -e

PROJECT_DIR="/workspaces/GranoAndClickFront"
cd $PROJECT_DIR

echo "Iniciando orquestación "

if [ ! -f package.json ]; then
    echo "Generando package.json"
    cat <<EOF > package.json
{
  "name": "grano-and-click",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "lint": "prettier --write ."
  },
  "devDependencies": {
    "vitest": "latest",
    "playwright": "latest",
    "@playwright/test": "latest",
    "prettier": "latest"
  }
}
EOF
fi

mkdir -p tests/unit tests/e2e src

if [ ! -f tests/unit/cart.test.js ]; then
    cat <<EOF > tests/unit/cart.test.js
import { expect, test } from 'vitest';
const calculateTotal = (price, qty) => price * qty;
test('Suma total del carrito correcta', () => {
    expect(calculateTotal(10, 3)).toBe(30);
});
EOF
fi

if [ ! -f tests/e2e/home.spec.js ]; then
    cat <<EOF > tests/e2e/home.spec.js
import { test, expect } from '@playwright/test';
test('Carga inicial de Home', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page).toHaveTitle(/GranoAndClick/);
});
EOF
fi

if [ ! -f src/index.html ]; then
    echo "<!DOCTYPE html><html><head><title>GranoAndClick</title></head><body><h1>Bienvenido a GranoAndClick</h1></body></html>" > src/index.html
fi

echo "Validando integridad de Nginx (Anti-403)"
if [ ! -f index.html ]; then
    echo " Vinculando src/index.html a la raíz para evitar 403"
    ln -s src/index.html index.html 2>/dev/null || cp src/index.html index.html
fi

sudo chown -R vscode:vscode src tests 2>/dev/null || true
sudo chown -R vscode:vscode node_modules 2>/dev/null || true

echo "Instalando dependencias de Node"
npm install

echo "Configurando Playwright y dependencias de sistema"
npx playwright install --with-deps chromium

echo "Validando conectividad con MariaDB"
until nc -z db 3306; do
    echo "Esperando MariaDB en el puerto 3306"
    sleep 2
done

echo " Entorno Listo"
