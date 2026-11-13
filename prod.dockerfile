# Build React front-end
FROM node:22 AS frontend
WORKDIR /app
COPY front .
RUN npm install && npm run build

# Setup Flask back-end
FROM python:3

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

COPY --from=frontend /app/dist /var/www/html

# Install Apache
RUN apt update && apt install -y apache2 && a2enmod proxy proxy_http rewrite headers
COPY apache/apache-prod.conf /etc/apache2/sites-enabled/000-default.conf

# Start back-end
WORKDIR /app
COPY back .
RUN pip3 install -r requirements.txt

COPY prod.entrypoint.sh /app/
ENTRYPOINT ./prod.entrypoint.sh

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:9001", "app:app"]
