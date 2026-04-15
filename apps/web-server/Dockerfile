FROM node:25.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y curl gcc libc6-dev && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS build
# Install Rust and wasm-pack
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,target=/root/.cargo/registry \
    --mount=type=cache,target=/root/.cargo/git \
    pnpm --filter @fizzbuzz/web-server... build
RUN pnpm deploy --filter @fizzbuzz/web-server --prod /prod/web-server

FROM node:25.9.0-slim
WORKDIR /app
COPY --from=build /prod/web-server /app

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
