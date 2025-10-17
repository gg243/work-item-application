# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# If you use native deps (optional), add build deps here; minimal for typical Nest/TS
RUN apk add --no-cache python3 make g++ 


COPY package.json package-lock.json ./

# install deps (use CI-friendly npm ci)
RUN npm ci

# copy source
COPY . .

# build TypeScript to /dist
RUN npm run build

# Stage 2: production image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only what's needed
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 5000

# Use a non-root user (optional, more secure)
USER node

CMD ["node", "dist/main"]
