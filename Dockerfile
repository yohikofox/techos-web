FROM --platform=linux/amd64  node:18-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build

ARG CMS_ENDPOINT
ENV CMS_ENDPOINT=${CMS_ENDPOINT}
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ARG CMS_API_KEY
ENV CMS_API_KEY=${CMS_API_KEY}
ARG NEXT_PUBLIC_FRONT_URL
ENV NEXT_PUBLIC_FRONT_URL=${NEXT_PUBLIC_FRONT_URL}
ARG NEXT_PUBLIC_BUCKET_HOST
ENV NEXT_PUBLIC_BUCKET_HOST=${NEXT_PUBLIC_BUCKET_HOST}
ARG CMS_ENDPOINT_HOSTNAME
ENV CMS_ENDPOINT_HOSTNAME=${CMS_ENDPOINT_HOSTNAME}
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM base

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["pnpm", "start"]