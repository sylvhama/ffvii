#!/bin/bash

set -e

IMAGE_NAME="playwright-test-image"
CONTAINER_NAME="playwright-test-container"
LOCAL_SCREENSHOTS_DIR="./tests/screenshot.spec.ts-snapshots"
CONTAINER_SCREENSHOTS_DIR="/app/tests/screenshot.spec.ts-snapshots"

echo "Docker build"
docker build -t "$IMAGE_NAME" .

echo "Run tests and update snapshots"
docker run --name "$CONTAINER_NAME" "$IMAGE_NAME" npx playwright test --update-snapshots || echo "Tests completed with errors."

echo "Copying screenshots from container to host system"
docker cp "$CONTAINER_NAME:$CONTAINER_SCREENSHOTS_DIR" "$LOCAL_SCREENSHOTS_DIR"

docker rm "$CONTAINER_NAME"
