FROM node:25.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @fizzbuzz/analytics-service... build
RUN pnpm deploy --filter @fizzbuzz/analytics-service --prod /prod/analytics-service

FROM node:25.9.0-slim
WORKDIR /app
COPY --from=build /prod/analytics-service /app

EXPOSE 3001
CMD [ "node", "dist/index.js" ]
