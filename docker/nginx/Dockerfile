FROM nginx:1.23

RUN mkdir -p /app/static/uploads

COPY uploads /app/static/uploads
COPY /docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
