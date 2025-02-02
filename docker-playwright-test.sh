#!/bin/bash

set -e

IMAGE_NAME="playwright-test-image"
CONTAINER_NAME="playwright-test-container"
LOCAL_SCREENSHOTS_DIR="./tests/screenshot.spec.ts-snapshots"
CONTAINER_SCREENSHOTS_DIR="/app/tests/screenshot.spec.ts-snapshots"
LOCAL_TEST_RESULTS_DIR="./test-results"
CONTAINER_TEST_RESULTS_DIR="/app/test-results"

echo "Docker build"
docker build -t "$IMAGE_NAME" .

echo "Run tests"
if docker run --name "$CONTAINER_NAME" "$IMAGE_NAME" npx playwright test "$@"; then
  echo "Tests passed. Copying screenshots from container to host system"

  mkdir -p "$LOCAL_SCREENSHOTS_DIR"
  docker cp "$CONTAINER_NAME:$CONTAINER_SCREENSHOTS_DIR/." "$LOCAL_SCREENSHOTS_DIR"
else
  echo "Tests failed. Copying test results from container to host system"

  rm -rf "$LOCAL_TEST_RESULTS_DIR"
  mkdir -p "$LOCAL_TEST_RESULTS_DIR"
  docker cp "$CONTAINER_NAME:$CONTAINER_TEST_RESULTS_DIR/." "$LOCAL_TEST_RESULTS_DIR"
fi

docker rm "$CONTAINER_NAME"
