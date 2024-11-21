FROM node:22.11.0-alpine AS node_stage

WORKDIR /usr/app

COPY . .

# Install system dependencies
# RUN apk add --no-cache --virtual .gyp python3 make g++

# Install Node dependencies
RUN npm install --frozen-lockfile

# Build production ready application
RUN NODE_ENV=development npm run build -- --mode development

FROM nginx:1.27.2-alpine

WORKDIR /usr/share/nginx/html

COPY --from=node_stage /usr/app/dist .

COPY nginx/templates/integration_test.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
