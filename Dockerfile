FROM node:18.3.0-alpine3.14 AS node_stage

WORKDIR /usr/app

COPY . .

ENV NODE_ENV=production

# Install system dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++

# Install Node dependencies
RUN yarn install --frozen-lockfile

# Build production ready application
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=node_stage /usr/app/build .
COPY nginx/templates/default.conf.template /etc/nginx/templates/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
