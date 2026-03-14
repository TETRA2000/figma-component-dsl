#!/usr/bin/env bash
# Build the preview app and export as standalone HTML
# Usage: ./build-and-export.sh [output-path]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../" && pwd)"
PREVIEW_DIR="$PROJECT_ROOT/preview"
OUTPUT_PATH="${1:-$PROJECT_ROOT/output/page.html}"
OUTPUT_DIR="$(dirname "$OUTPUT_PATH")"

if [ ! -d "$PREVIEW_DIR" ]; then
  echo "ERROR: Preview directory not found at $PREVIEW_DIR"
  exit 1
fi

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Clean previous build
rm -rf "$PREVIEW_DIR/dist"

echo "=== Step 1: Install dependencies ==="
if [ ! -d "$PREVIEW_DIR/node_modules" ]; then
  cd "$PREVIEW_DIR" && npm install
fi

echo ""
echo "=== Step 2: Build with Vite ==="
cd "$PREVIEW_DIR" && npx vite build
echo "Build complete."

echo ""
echo "=== Step 3: Copy to output ==="
cp "$PREVIEW_DIR/dist/index.html" "$OUTPUT_PATH"
echo "Exported to: $OUTPUT_PATH"

# Copy assets if they exist
if [ -d "$PREVIEW_DIR/dist/assets" ]; then
  mkdir -p "$OUTPUT_DIR/assets"
  cp -r "$PREVIEW_DIR/dist/assets/"* "$OUTPUT_DIR/assets/"
  echo "Assets copied to: $OUTPUT_DIR/assets/"
fi

echo ""
echo "=== Export complete ==="
echo "HTML: $OUTPUT_PATH"
FILE_SIZE=$(du -h "$OUTPUT_PATH" | cut -f1)
echo "Size: $FILE_SIZE"
