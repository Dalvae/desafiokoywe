FROM node:20-slim
WORKDIR /app
RUN apk add --no-cache make gcc g++ python3
RUN npm install -g pnpm
CMD ["sh", "-c", "pnpm install && pnpm prisma migrate deploy && pnpm prisma generate && pnpm start:dev"]
