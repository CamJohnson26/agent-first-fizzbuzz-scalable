FROM node:25.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y curl gcc libc6-dev libgmp-dev && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS build
# Install Lean 4 (elan)
RUN curl https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh -sSf | sh -s -- -y --default-toolchain none
ENV PATH="/root/.elan/bin:${PATH}"

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @fizzbuzz/lean-service... build
RUN pnpm deploy --filter @fizzbuzz/lean-service --prod /prod/lean-service

FROM node:25.9.0-slim
# Install libgmp10 for Lean runtime
RUN apt-get update && apt-get install -y libgmp10 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /prod/lean-service /app
# Copy the compiled lean binary
COPY --from=build /usr/src/app/packages/verified-algorithms/lean/.lake/build/bin/fizzbuzz /app/bin/fizzbuzz
ENV LEAN_BINARY_PATH=/app/bin/fizzbuzz

EXPOSE 3002
CMD [ "node", "dist/index.js" ]
