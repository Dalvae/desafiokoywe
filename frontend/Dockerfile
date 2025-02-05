FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY . .
EXPOSE ${FRONTEND_PORT}
CMD ["pnpm", "dev"]