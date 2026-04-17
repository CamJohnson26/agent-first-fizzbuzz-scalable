FROM node:24.14.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS prune
WORKDIR /usr/src/app
COPY . .
RUN pnpm install turbo --global
RUN turbo prune --scope=@fizzbuzz/analytics-service --docker

FROM base AS build
WORKDIR /usr/src/app

# First copy only the json files to install dependencies
COPY --from=prune /usr/src/app/out/json/ .
COPY --from=prune /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /usr/src/app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY scripts/ ./scripts/
COPY .node-version tsconfig.json ./

# Install dependencies using cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Now copy the full source and build
COPY --from=prune /usr/src/app/out/full/ .
RUN pnpm --filter @fizzbuzz/analytics-service... build
RUN pnpm deploy --filter @fizzbuzz/analytics-service --prod /prod/analytics-service

FROM node:24.14.1-slim
WORKDIR /app
COPY --from=build /prod/analytics-service /app

EXPOSE 3001
CMD [ "node", "dist/index.js" ]
