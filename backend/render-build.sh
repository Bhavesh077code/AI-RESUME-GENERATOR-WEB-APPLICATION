#!/bin/bash

echo "🚀 Installing dependencies..."

npm install

echo "🌐 Installing Puppeteer Chrome..."

npx puppeteer browsers install chrome

echo "✅ Puppeteer Chrome installed successfully!"