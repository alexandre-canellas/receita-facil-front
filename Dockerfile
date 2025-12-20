# ReceitaFacil Frontend - Dockerfile
# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm ci

# Copia o codigo fonte
COPY . .

# Define a URL da API para o build
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

# Executa o build
RUN npm run build

# Stage 2: Producao com Nginx
FROM nginx:alpine

# Copia a configuracao customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expoe a porta 80
EXPOSE 80

# Comando padrao do Nginx
CMD ["nginx", "-g", "daemon off;"]
