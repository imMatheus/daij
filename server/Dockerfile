# syntax=docker/dockerfile:1

FROM oven/bun:1-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source code
COPY src ./src

# Set environment variables
ENV NODE_ENV=production

# Expose the port
EXPOSE 3001

# Start the server
CMD ["bun", "src/index.ts"]
