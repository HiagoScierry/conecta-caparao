# Build stage
FROM node:22.11-alpine AS base

# Build stage
FROM base AS builder
WORKDIR /app

# Copy package files and Prisma schema (needed by the postinstall `prisma generate`)
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Migration stage - runs `prisma migrate deploy` and exits
FROM builder AS migrator
WORKDIR /app
CMD ["npx", "prisma", "migrate", "deploy"]

# Production stage
FROM base AS runner
WORKDIR /app

# Install curl, wget and su-exec for health checks and user switching
RUN apk add --no-cache curl wget su-exec

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create uploads directory and set permissions
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads

# Switch to nextjs user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]