FROM node:22-alpine AS build
WORKDIR /app/apps/banco-proyectos
COPY apps/banco-proyectos/package*.json ./
RUN npm ci
COPY apps/banco-proyectos/ ./
COPY apps/donde-publicar/site/ /app/apps/donde-publicar/site/
COPY apps/eventos/site/ /app/apps/eventos/site/
RUN npm run build

FROM nginx:alpine
COPY deploy/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/apps/banco-proyectos/dist/ /usr/share/nginx/html/
ENV PORT=8080
EXPOSE 8080
