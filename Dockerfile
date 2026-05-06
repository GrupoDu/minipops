FROM node:25-alpine AS base

WORKDIR /app

COPY . .

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

FROM base AS prod
RUN echo "=> Rodando em produção..."
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]

FROM base AS dev
RUN echo "=> Rodando em dev..."
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
