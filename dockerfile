FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

COPY . .

RUN npm ci

ENV CI=true

RUN npm run build

CMD ["npx", "playwright", "test"]
