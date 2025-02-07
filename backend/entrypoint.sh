#!/bin/bash
set -e

# Retry migrations up to 3 times
for i in {1..3}; do
  # Run migrations
  echo "Running Prisma migrations (attempt $i)..."
  pnpm prisma migrate deploy
  if [ $? -eq 0 ]; then
    echo "Prisma migrations completed successfully."
    break
  else
    echo "Prisma migrations failed (attempt $i). Retrying in 5 seconds..."
    sleep 5
  fi
done

# Check if migrations were successful
if [ $i -gt 3 ]; then
  echo "Prisma migrations failed after multiple retries. Exiting."
  exit 1
fi

# Generate Prisma client
echo "Generating Prisma client..."
pnpm prisma generate

# Start the application
echo "Starting the application..."
pnpm start:dev
