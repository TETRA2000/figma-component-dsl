#!/usr/bin/env bash
# Launch the preview dev server for landing page development
# Usage: ./launch-preview.sh [port]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../" && pwd)"
PREVIEW_DIR="$PROJECT_ROOT/preview"
PORT="${1:-5173}"

if [ ! -d "$PREVIEW_DIR" ]; then
  echo "ERROR: Preview directory not found at $PREVIEW_DIR"
  exit 1
fi

# Install dependencies if needed
if [ ! -d "$PREVIEW_DIR/node_modules" ]; then
  echo "Installing preview dependencies..."
  cd "$PREVIEW_DIR" && npm install
fi

echo "Starting preview server on port $PORT..."
cd "$PREVIEW_DIR" && npx vite --port "$PORT"
