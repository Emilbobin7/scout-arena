# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies within container
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (Google Cloud Run expects 8080 via PORT env var)
EXPOSE 8080

# Start command
CMD ["node", "server.js"]
