FROM oven/bun:alpine AS base

WORKDIR /app

COPY . .

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

FROM base AS prod
RUN echo "=> Rodando em produção..."
RUN bun install
RUN bun run build
EXPOSE 3001
CMD ["bun", "run", "start"]

FROM base AS dev
RUN echo "=> Rodando em dev..."
RUN bun install
EXPOSE 3000
CMD ["bun", "run", "dev"]
