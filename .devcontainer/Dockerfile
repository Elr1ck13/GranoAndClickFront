# STAGE 1: Development
FROM node:22-bookworm-slim AS development

ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update && apt-get install -y --no-install-recommends \
    git nginx mariadb-client procps curl ca-certificates dos2unix sudo netcat-openbsd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN groupmod -n vscode node && usermod -l vscode -m -d /home/vscode node \
    && if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod -g $USER_GID vscode && usermod -u $USER_UID -g $USER_GID vscode; \
    fi \
    && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/vscode

COPY <<EOF /etc/nginx/sites-available/default
server {
    listen 8080;
    root /workspaces/GranoAndClickFront;
    index index.html;
    sendfile off;
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

RUN mkdir -p /workspaces/GranoAndClickFront \
    && chown -R vscode:vscode /workspaces/GranoAndClickFront /var/www/html /var/lib/nginx /var/log/nginx /run

COPY setup.sh /usr/local/bin/setup.sh
RUN dos2unix /usr/local/bin/setup.sh && chmod +x /usr/local/bin/setup.sh

USER vscode
WORKDIR /workspaces/GranoAndClickFront

CMD ["nginx", "-g", "daemon off;"]

# STAGE 2: Production
FROM nginx:alpine AS production
COPY --from=development /workspaces/GranoAndClickFront /usr/share/nginx/html
EXPOSE 80