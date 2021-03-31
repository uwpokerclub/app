FROM node:14.16.0-alpine3.11 AS node_stage

# Set work dir
WORKDIR /usr/app

COPY . .

# Install all deps
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && npm run build

FROM alpine:latest
WORKDIR /usr/app/build/
COPY --from=node_stage /usr/app/build .
