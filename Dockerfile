FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG NEXT_PUBLIC_ARCADE_URL=https://taco-smack-table.lachingada1242.chatgpt.site/
ARG NEXT_PUBLIC_RESERVATION_URL=https://rezzo.bodhix.io
ARG NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN=false
ENV NEXT_PUBLIC_ARCADE_URL=$NEXT_PUBLIC_ARCADE_URL \
    NEXT_PUBLIC_RESERVATION_URL=$NEXT_PUBLIC_RESERVATION_URL \
    NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN=$NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN
RUN npm run build:windows

FROM node:24-bookworm-slim AS staging
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates libatomic1 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/scripts/preview-server.mjs /app/scripts/preview-proxy.mjs ./scripts/
RUN mkdir -p /data/main && chown -R node:node /app /data
ENV NODE_ENV=production WRANGLER_SEND_METRICS=false WRANGLER_LOG_PATH=/tmp/wrangler-main.log PREVIEW_HOST=0.0.0.0 PREVIEW_STATE_DIR=/data/main
USER node
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s CMD node -e "fetch('http://127.0.0.1:8787/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "scripts/preview-server.mjs"]
