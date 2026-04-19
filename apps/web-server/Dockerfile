FROM node:24.14.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y curl gcc libc6-dev python3 python3-pip python3-venv && rm -rf /var/lib/apt/lists/*
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS prune
WORKDIR /usr/src/app
COPY . .
RUN pnpm install turbo --global
RUN turbo prune @fizzbuzz/web-server @fizzbuzz/transformer --docker

FROM base AS build
# Install Rust and wasm-pack
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

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
RUN --mount=type=cache,target=/root/.cargo/registry \
    --mount=type=cache,target=/root/.cargo/git \
    pnpm --filter @fizzbuzz/web-server... build
RUN pnpm deploy --filter @fizzbuzz/web-server --prod /prod/web-server

FROM node:24.14.1-slim
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /prod/web-server /app
COPY --from=build /usr/src/app/apps/fizzbuzz-transformer /app/fizzbuzz-transformer
# Copy the model file which is gitignored but needed for inference
COPY apps/fizzbuzz-transformer/fizzbuzz_model.pt /app/fizzbuzz-transformer/fizzbuzz_model.pt

# Setup venv and install torch
RUN python3 -m venv /app/venv
RUN /app/venv/bin/pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

ENV NODE_ENV=production
ENV PYTHON_PATH=/app/venv/bin/python
ENV TRANSFORMER_PATH=/app/fizzbuzz-transformer
ENV TRANSFORMER_MODEL_PATH=/app/fizzbuzz-transformer/fizzbuzz_model.pt

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
