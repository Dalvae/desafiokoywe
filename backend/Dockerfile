FROM node:20-slim
WORKDIR /app
RUN apk add --no-cache make gcc g++ python3

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile || exit 1

COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
