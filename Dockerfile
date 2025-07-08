# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --force

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build -- --output-path=./dist/lms-app --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS runner

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

# Copy SSL certificates
# COPY ./ssl/fullchain.pem /etc/nginx/ssl/fullchain.pem
# COPY ./ssl/privkey.pem /etc/nginx/ssl/privkey.pem

# Copy the custom Nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application from the builder stage
COPY --from=builder /app/dist/lms-app/browser /usr/share/nginx/html

# Expose both HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
