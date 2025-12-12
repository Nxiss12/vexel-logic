FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci && cp -R node_modules /tmp/node_modules

FROM base AS build
COPY --from=deps /tmp/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=deps /tmp/node_modules ./node_modules
COPY --from=build /app/server ./server
COPY --from=build /app/migrations ./migrations

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/api/healthz || exit 1

CMD ["node", "server/index.js"]
