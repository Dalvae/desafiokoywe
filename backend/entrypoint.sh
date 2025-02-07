#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  echo "Waiting for PostgreSQL with user ${POSTGRES_USER} on database ${POSTGRES_DB}..."
  sleep 1
done
echo "PostgreSQL is ready!"

echo "Creating initial migration..."
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}" pnpm prisma migrate dev --name init

echo "Applying migrations..."
for i in {1..3}; do
  echo "Running Prisma migrations (attempt $i)..."
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}" pnpm prisma migrate deploy
  if [ $? -eq 0 ]; then
    echo "Prisma migrations completed successfully."
    break
  else
    echo "Prisma migrations failed (attempt $i). Retrying in 5 seconds..."
    sleep 5
  fi
done

echo "Generating Prisma client..."
pnpm prisma generate

echo "Starting the application in development mode..."
pnpm start:dev