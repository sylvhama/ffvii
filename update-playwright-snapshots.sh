#!/bin/bash

set -e

IMAGE_NAME="playwright-test-image"
CONTAINER_NAME="playwright-test-container"
LOCAL_SCREENSHOTS_DIR="./tests/screenshot.spec.ts-snapshots"
CONTAINER_SCREENSHOTS_DIR="/app/tests/screenshot.spec.ts-snapshots"

echo "Docker build"
docker build -t "$IMAGE_NAME" .

echo "Run tests and update snapshots"
if docker run --name "$CONTAINER_NAME" "$IMAGE_NAME" npx playwright test --update-snapshots; then
  echo "Tests passed. Copying screenshots from container to host system"
  
  # Ensure LOCAL_SCREENSHOTS_DIR exists
  mkdir -p "$LOCAL_SCREENSHOTS_DIR"
  
  # Copy contents instead of the entire directory
  docker cp "$CONTAINER_NAME:$CONTAINER_SCREENSHOTS_DIR/." "$LOCAL_SCREENSHOTS_DIR"
else
  echo "Tests failed. Skipping screenshot copy."
fi

docker rm "$CONTAINER_NAME"
