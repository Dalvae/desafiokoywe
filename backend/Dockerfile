FROM node:20-slim
WORKDIR /app

# Instalar openssl y netcat-openbsd
RUN apt-get update -y && \
    apt-get install -y openssl netcat-openbsd procps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Dar permisos al script de entrada
RUN chmod +x entrypoint.sh

CMD ["/bin/bash", "./entrypoint.sh"]