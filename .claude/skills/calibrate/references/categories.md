# Test Suite Categories Reference

## Property-level categories

### corner-radius (5 variants)
- `corner-radius-zero` -- 100x100, radius 0
- `corner-radius-small` -- 100x100, radius 1
- `corner-radius-half` -- 100x60, radius 30 (half of min dimension)
- `corner-radius-exceeds` -- 100x60, radius 200 (exceeds bounds, gets clamped)
- `corner-radius-max` -- 100x100, radius 9999 (pill shape)

### fills-solid (3 variants)
- `fills-solid-single` -- Single red fill
- `fills-solid-semi-transparent` -- Green fill at 50% opacity
- `fills-solid-multi` -- Two overlapping fills (red + blue)

### fills-gradient (4 variants)
- `fills-gradient-0deg` -- Left-to-right red-to-blue
- `fills-gradient-45deg` -- 45-degree angle
- `fills-gradient-90deg` -- Top-to-bottom
- `fills-gradient-multi-stop` -- Three-stop gradient (red, green, blue)

### strokes (3 variants)
- `strokes-thin` -- 1px black stroke
- `strokes-medium` -- 2px red stroke
- `strokes-thick` -- 4px blue stroke

### auto-layout-horizontal (3 variants)
- `auto-layout-horizontal-basic` -- 3 colored boxes, default alignment
- `auto-layout-horizontal-center` -- CENTER + CENTER alignment with different heights
- `auto-layout-horizontal-space-between` -- SPACE_BETWEEN distribution

### auto-layout-vertical (2 variants)
- `auto-layout-vertical-basic` -- 3 colored boxes stacked
- `auto-layout-vertical-fill` -- Children with layoutSizingHorizontal: FILL

### auto-layout-nested (1 variant)
- `auto-layout-nested-basic` -- Vertical outer with horizontal inner rows

### typography (5 variants)
- `typography-sizes` -- 12, 16, 24, 48px text
- `typography-weights` -- 400, 600, 700 weights
- `typography-alignments` -- LEFT, CENTER, RIGHT in 200px container
- `typography-line-height` -- 150% and 24px line heights
- `typography-letter-spacing` -- Normal, tight, wide, percent spacing

### opacity (3 variants)
- `opacity-zero` -- Fully transparent
- `opacity-half` -- 50% opacity
- `opacity-full` -- Fully opaque

### clip-content (2 variants)
- `clip-content-true` -- Overflowing child clipped
- `clip-content-false` -- Overflowing child visible

### combined (3 variants)
- `combined-gradient-corner-radius` -- Gradient fill + rounded corners
- `combined-stroke-auto-layout` -- Stroke + horizontal auto-layout with rounded items
- `combined-typography-opacity` -- Bold text + semi-transparent container

## Theme categories

### hamburger-theme (9 variants)
Real-world restaurant UI components testing complex composition:

- `burger-badge` -- Pill badge component with bold uppercase text (80x22)
- `burger-button` -- CTA button with pill shape, cornerRadius 9999 (143x41)
- `burger-footer` -- Full-width footer bar, 1440x64, centered text
- `burger-header` -- Navigation bar with logo, buttons, SPACE_BETWEEN layout (1440x64)
- `burger-hero` -- Hero banner with gradient background, nested CTAs, 64px headline (1440x430)
- `burger-menu-card` -- Menu item card: image placeholder + content with textAutoResize: HEIGHT (260x328)
- `burger-menu-section` -- Section with header + 4-card horizontal grid (1440x569)
- `burger-order-banner` -- Promotional banner component with gradient + icon + text (216x69)
- `burger-value-section` -- Value menu section with 5 small cards on yellow background (1440x374)
