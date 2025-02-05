FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
CMD ["sh", "-c", "pnpm install && pnpm prisma generate && pnpm start:dev"]