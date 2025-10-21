# ---------- Stage 1: Build Angular app ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (for caching)
COPY webapp/package*.json ./webapp/

# Change to Angular project folder
WORKDIR /app/webapp

# Install dependencies
RUN npm ci

# Copy full Angular source
COPY webapp/ .

# Fix OpenSSL 3 issues
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build Angular in production mode
RUN npm run build -- --configuration production

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:stable-alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app
#COPY --from=builder /app/webapp/dist/adp-swallow /usr/share/nginx/html/adp-swallow

# Copy built Angular app to root instead of /adp-swallow
COPY --from=builder /app/webapp/dist/adp-swallow /usr/share/nginx/html


# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
