#!/bin/bash
set -e

# Run migrations
echo "Running Prisma migrations..."
pnpm prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
pnpm prisma generate

# Start the application
echo "Starting the application..."
pnpm start:dev
