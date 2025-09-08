# -----------------------------
# Stage 1: Build frontend
# -----------------------------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy package.json + package-lock.json
COPY frontend/package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev

# Copy frontend source
COPY frontend/ ./

# Use development mode for build
ENV NODE_ENV=development

# Build frontend
RUN npm run build

# -----------------------------
# Stage 2: Backend + Nginx
# -----------------------------
FROM node:20-alpine

# Install Nginx and bash
RUN apk add --no-cache nginx bash

# Backend setup
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Copy frontend build output
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Nginx configuration
RUN echo "server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location / { \
        try_files \$uri /index.html; \
    } \
    location /api/ { \
        proxy_pass http://127.0.0.1:8080; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade \$http_upgrade; \
        proxy_set_header Connection 'upgrade'; \
        proxy_set_header Host \$host; \
        proxy_cache_bypass \$http_upgrade; \
    } \
}" > /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 8080 80

# Start backend and Nginx together
CMD ["bash", "-c", "nginx && node /app/backend/index.js"]
