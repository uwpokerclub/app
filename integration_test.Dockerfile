FROM node:22.13.0-alpine AS node_stage

WORKDIR /usr/app

COPY . .

# Install system dependencies
# RUN apk add --no-cache --virtual .gyp python3 make g++

# Install Node dependencies
RUN npm install --frozen-lockfile

# Setup "dummy" production environment variables
RUN rm .env.production
RUN mv .env .env.production

# Build production ready application
RUN npm run build

FROM nginx:1.27.3-alpine

WORKDIR /usr/share/nginx/html

COPY --from=node_stage /usr/app/dist .

COPY nginx/templates/integration_test.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
