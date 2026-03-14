#!/usr/bin/env bash
# Validate a component against figma-dsl and launch dual preview
# Usage: ./validate-and-preview.sh <ComponentName>

set -euo pipefail

COMPONENT_NAME="${1:?Usage: validate-and-preview.sh <ComponentName>}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../" && pwd)"
COMPONENT_PATH="$PROJECT_ROOT/preview/src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx"
OUTPUT_DIR="$PROJECT_ROOT/output"

if [ ! -f "$COMPONENT_PATH" ]; then
  echo "ERROR: Component not found at $COMPONENT_PATH"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "=== Step 1: Validate DSL compatibility ==="
cd "$PROJECT_ROOT"
if "$PROJECT_ROOT/bin/figma-dsl" validate "$COMPONENT_PATH"; then
  echo "Validation passed."
else
  echo "Validation failed. Fix errors and re-run."
  exit 1
fi

echo ""
echo "=== Step 2: Compile DSL ==="
"$PROJECT_ROOT/bin/figma-dsl" compile "$COMPONENT_PATH" -o "$OUTPUT_DIR/"
echo "Compiled to $OUTPUT_DIR/$COMPONENT_NAME.json"

echo ""
echo "=== Step 3: Render DSL to PNG ==="
"$PROJECT_ROOT/bin/figma-dsl" render "$OUTPUT_DIR/$COMPONENT_NAME.json" -o "$OUTPUT_DIR/$COMPONENT_NAME.png"
echo "Rendered to $OUTPUT_DIR/$COMPONENT_NAME.png"

echo ""
echo "=== Step 4: Launch React preview ==="
echo "Starting dev server..."
cd "$PROJECT_ROOT/preview" && npx vite --port 5173 &
VITE_PID=$!

echo ""
echo "Preview running at http://localhost:5173"
echo "DSL render at $OUTPUT_DIR/$COMPONENT_NAME.png"
echo "Press Ctrl+C to stop."

wait $VITE_PID
