FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY LICENSE README.md client-config.json mcp-server.json server.json server.mjs ./

USER node

CMD ["node", "server.mjs"]
