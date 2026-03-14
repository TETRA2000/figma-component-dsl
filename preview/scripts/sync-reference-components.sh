#!/usr/bin/env bash
# sync-reference-components.sh
# Copies reference components from figma_design_playground into the preview app.
# Safe to re-run: overwrites reference component dirs, preserves custom barrel exports.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PREVIEW_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$PREVIEW_DIR/.." && pwd)"
REF_COMPONENTS="$PROJECT_ROOT/references/figma_design_playground/src/components"
DEST_COMPONENTS="$PREVIEW_DIR/src/components"

if [ ! -d "$REF_COMPONENTS" ]; then
  echo "Error: Reference components not found at $REF_COMPONENTS"
  echo "Run: git submodule update --init --recursive"
  exit 1
fi

mkdir -p "$DEST_COMPONENTS"

# List of reference component directories
COMPONENTS=(
  Badge Button CTABanner Container FAQ FeatureCard FeatureGrid
  Footer Hero LogoCloud Navbar PricingCard PricingTable Stats
  TestimonialCard Testimonials
)

echo "Syncing reference components..."

# Copy each component directory (overwrite)
for comp in "${COMPONENTS[@]}"; do
  if [ -d "$REF_COMPONENTS/$comp" ]; then
    rm -rf "$DEST_COMPONENTS/$comp"
    cp -r "$REF_COMPONENTS/$comp" "$DEST_COMPONENTS/$comp"
    echo "  Copied $comp"
  else
    echo "  Warning: $comp not found in reference app"
  fi
done

# Copy tokens.css and types.ts
cp "$REF_COMPONENTS/tokens.css" "$DEST_COMPONENTS/tokens.css"
echo "  Copied tokens.css"

cp "$REF_COMPONENTS/types.ts" "$DEST_COMPONENTS/types.ts"
echo "  Copied types.ts"

# Marker-based merge for index.ts
INDEX_FILE="$DEST_COMPONENTS/index.ts"
BEGIN_MARKER="// --- BEGIN REFERENCE EXPORTS ---"
END_MARKER="// --- END REFERENCE EXPORTS ---"

# Generate reference exports block
REFERENCE_EXPORTS=""
for comp in "${COMPONENTS[@]}"; do
  REFERENCE_EXPORTS+="export { $comp } from './$comp/$comp';"$'\n'
done

# Build the new reference section
NEW_REFERENCE_SECTION="$BEGIN_MARKER
$REFERENCE_EXPORTS$END_MARKER"

if [ -f "$INDEX_FILE" ]; then
  # File exists — check if markers are present
  if grep -q "$BEGIN_MARKER" "$INDEX_FILE" && grep -q "$END_MARKER" "$INDEX_FILE"; then
    # Replace content between markers (inclusive)
    # Extract content after end marker (custom exports)
    CUSTOM_EXPORTS=$(sed -n "/${END_MARKER}/,\$p" "$INDEX_FILE" | tail -n +2)
    echo "$NEW_REFERENCE_SECTION" > "$INDEX_FILE"
    if [ -n "$CUSTOM_EXPORTS" ]; then
      echo "$CUSTOM_EXPORTS" >> "$INDEX_FILE"
    fi
  else
    # Markers not found — prepend reference section, keep existing content
    EXISTING=$(cat "$INDEX_FILE")
    echo "$NEW_REFERENCE_SECTION" > "$INDEX_FILE"
    if [ -n "$EXISTING" ]; then
      echo "" >> "$INDEX_FILE"
      echo "$EXISTING" >> "$INDEX_FILE"
    fi
  fi
else
  # File doesn't exist — create with reference exports only
  echo "$NEW_REFERENCE_SECTION" > "$INDEX_FILE"
fi

echo "  Updated index.ts (marker-based merge)"
echo "Sync complete."
