FROM node:16.15.0-alpine3.14 AS node_stage

WORKDIR /usr/app

COPY . .

# Install system dependencies
RUN apk add --no-cache --virtual .gyp python make g++

# Install Node dependencies
RUN yarn install --frozen-lockfile

# Build production ready application
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=node_stage /usr/app/build .
COPY --from=node_stage /usr/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
