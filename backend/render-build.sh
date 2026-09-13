#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
npm install

echo "Installing Chrome for Puppeteer..."
npx puppeteer browsers install chrome

echo "Verifying Puppeteer browser..."
node -e "import('puppeteer').then(m => console.log('Chrome path:', m.default.executablePath()))"

echo "Build complete."
