# This is a template Dockerfile that can be used to build any service in the monorepo.
# Usage: docker build --build-arg APP=@fizzbuzz/analytics-service -t analytics-service .

FROM node:25.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y curl gcc libc6-dev libgmp-dev && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS prune
ARG APP
WORKDIR /usr/src/app
COPY . .
RUN pnpm install turbo --global
RUN turbo prune --scope=$APP --docker

FROM base AS build
ARG APP
# Install additional build tools if needed (Rust, Lean, etc. can be added here or in specific stages)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y
RUN curl https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh -sSf | sh -s -- -y --default-toolchain none
ENV PATH="/root/.elan/bin:${PATH}"

WORKDIR /usr/src/app

# First copy only the json files to install dependencies
COPY --from=prune /usr/src/app/out/json/ .
COPY --from=prune /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /usr/src/app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY scripts/ ./scripts/
COPY .node-version ./

# Install dependencies using cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Now copy the full source and build
COPY --from=prune /usr/src/app/out/full/ .
RUN --mount=type=cache,target=/root/.cargo/registry \
    --mount=type=cache,target=/root/.cargo/git \
    pnpm --filter $APP... build

# Production target (default to node)
FROM node:25.9.0-slim AS production
ARG APP
RUN apt-get update && apt-get install -y libgmp10 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
# Note: In a centralized Dockerfile, we need to know the output directory.
# This template assumes pnpm deploy is used or the build produces a dist folder.
# For better results, use the individual Dockerfiles in each app directory which are already optimized.
