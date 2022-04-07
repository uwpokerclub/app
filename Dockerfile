FROM node:14.16.0-alpine3.11 AS node_stage

# Set work dir
WORKDIR /usr/app

COPY . .

# Install all deps
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=node_stage /usr/app/build .
COPY --from=node_stage /usr/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
