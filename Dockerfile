# -----------------------------
# Stage 1: Build frontend
# -----------------------------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies including devDependencies
RUN npm install --include=dev

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# -----------------------------
# Stage 2: Backend + Nginx
# -----------------------------
FROM node:20-alpine

# Install Nginx and bash
RUN apk add --no-cache nginx bash

# Create Nginx log directories
RUN mkdir -p /var/log/nginx

# Backend setup
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Copy frontend build output to Nginx html
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8080

# Start backend and Nginx together
CMD ["bash", "-c", "nginx && node /app/backend/index.js"]

