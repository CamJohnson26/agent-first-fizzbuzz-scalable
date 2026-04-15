FROM node:25.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest --force && corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter marketing-landing-page... build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/apps/marketing-landing-page/dist ./agent-first-fizzbuzz-scalable
RUN ln -sf agent-first-fizzbuzz-scalable/index.html index.html && \
    ln -sf agent-first-fizzbuzz-scalable/assets assets && \
    ln -sf agent-first-fizzbuzz-scalable/favicon.ico favicon.ico && \
    ln -sf agent-first-fizzbuzz-scalable/vite.svg vite.svg
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
