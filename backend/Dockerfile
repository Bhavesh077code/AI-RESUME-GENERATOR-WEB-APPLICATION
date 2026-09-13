FROM node:22-bookworm-slim
WORKDIR /app

# Chrome download ke liye sab kuch install karo
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    fonts-noto-color-emoji \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    unzip \
    xz-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Yahi pe Chrome v151 download hoga - isme 1-2 min lagega
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]