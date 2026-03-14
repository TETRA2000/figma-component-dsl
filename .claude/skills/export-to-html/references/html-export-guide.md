# HTML Export Guide

Reference for exporting React pages as self-contained HTML files.

## Build Process

The export uses Vite's production build:

```bash
cd preview && npx vite build
```

Output structure:
```
preview/dist/
  index.html       # Entry HTML with script/style references
  assets/
    index-{hash}.js   # Bundled React app + components
    index-{hash}.css  # Bundled styles including design tokens
```

## Self-Contained Inlining

To create a single HTML file with everything inlined:

1. Read `dist/index.html`
2. Find `<link>` tags referencing CSS files
3. Replace each `<link>` with `<style>` containing the CSS file contents
4. Find `<script>` tags referencing JS files
5. Replace each `<script src="...">` with `<script>` containing the JS file contents
6. Write the combined HTML

This produces a single file that works offline (except for external URLs).

## Asset Handling

### Images
- **Inline SVGs** (lucide-react icons): Already embedded in the JS bundle, no action needed
- **External URLs** (dicebear, CDN images): Remain as URLs, require internet
- **Local images** imported in components: Bundled by Vite as base64 (< 4KB) or separate files

### Fonts
- System fonts (`font-sans` token): No external dependency
- Google Fonts: Remain as external `@import`, require internet
- To inline fonts: download .woff2 files and convert to base64 `@font-face`

### CSS Design Tokens
- All `var(--token)` values are included in the bundled CSS
- The `tokens.css` file is bundled automatically by Vite

## Responsive Behavior

The exported HTML preserves all responsive behavior:
- CSS media queries remain functional
- `prefers-color-scheme` dark mode works
- Viewport meta tag is included in the HTML template
- Flexbox/Grid layouts adapt to screen size

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank page | JS error | Check browser console |
| Missing styles | CSS not inlined | Verify CSS `<link>` replacement |
| Broken images | External URLs | Warn user about internet requirement |
| Large file size | Unoptimized images | Use smaller images or external URLs |
| No dark mode | Missing media query | Check tokens.css is bundled |
