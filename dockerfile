FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD ["npx", "playwright", "test"]
