#!/usr/bin/env bash
# Compile a component to DSL and export for Figma import
# Usage: ./compile-and-export.sh <ComponentName> [--format plugin|mcp]

set -euo pipefail

COMPONENT_NAME="${1:?Usage: compile-and-export.sh <ComponentName> [--format plugin|mcp]}"
FORMAT="${2:---format plugin}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../" && pwd)"
COMPONENT_PATH="$PROJECT_ROOT/preview/src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx"
OUTPUT_DIR="$PROJECT_ROOT/output"

if [ ! -f "$COMPONENT_PATH" ]; then
  echo "ERROR: Component not found at $COMPONENT_PATH"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "=== Step 1: Compile DSL ==="
cd "$PROJECT_ROOT"
"$PROJECT_ROOT/bin/figma-dsl" compile "$COMPONENT_PATH" -o "$OUTPUT_DIR/"
echo "Compiled: $OUTPUT_DIR/$COMPONENT_NAME.json"

echo ""
echo "=== Step 2: Export for Figma ==="
"$PROJECT_ROOT/bin/figma-dsl" export "$OUTPUT_DIR/$COMPONENT_NAME.json" -o "$OUTPUT_DIR/$COMPONENT_NAME.figma.json" $FORMAT
echo "Exported: $OUTPUT_DIR/$COMPONENT_NAME.figma.json"

echo ""
echo "=== Step 3: Render preview PNG ==="
"$PROJECT_ROOT/bin/figma-dsl" render "$OUTPUT_DIR/$COMPONENT_NAME.json" -o "$OUTPUT_DIR/$COMPONENT_NAME.png"
echo "Rendered: $OUTPUT_DIR/$COMPONENT_NAME.png"

echo ""
echo "Export complete. Files:"
echo "  DSL JSON:   $OUTPUT_DIR/$COMPONENT_NAME.json"
echo "  Figma JSON: $OUTPUT_DIR/$COMPONENT_NAME.figma.json"
echo "  Preview:    $OUTPUT_DIR/$COMPONENT_NAME.png"
