# Multi-stage Dockerfile for building Angular app and serving with nginx
FROM node:20.19.0-alpine AS builder
ARG BUILD_CONFIG=production
ENV BUILD_CONFIG=${BUILD_CONFIG}
WORKDIR /app

# Install dependencies (uses package-lock if present)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# Build bundle using chosen configuration (production by default)
RUN npm run build -- --configuration $BUILD_CONFIG

### Production image
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder - Angular output is at /app/dist/<projectName>
COPY --from=builder /app/dist/RelojChecadorApp /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 7676
CMD ["nginx", "-g", "daemon off;"]
