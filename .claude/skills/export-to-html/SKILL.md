---
name: export-to-html
description: >
  Export React component pages as self-contained HTML files. Use this skill
  whenever the user wants to generate static HTML, create deployable web
  pages, export a page as HTML, save a page for sharing, or produce a
  standalone web file from their React components. Also trigger when the
  user mentions HTML export, static site generation, or wants a portable
  version of their page. Covers: "export as HTML", "generate HTML",
  "static page", "save as HTML", "downloadable page", "standalone HTML",
  "self-contained page", "deploy page".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Export to HTML

Build React pages into self-contained, deployable HTML files using Vite.

## Workflow

### Step 1: Verify Target Page

Confirm which page the user wants to export. Check `preview/src/App.tsx` to see what is currently rendered.

If the user specifies a different page than what is currently in App.tsx, update it:

```tsx
import { TargetPage } from './pages/TargetPage'

function App() {
  return <TargetPage />
}

export default App
```

### Step 2: Launch Preview for Verification

Before building, launch the dev server so the user can verify the page looks correct:

```bash
cd /home/user/figma-component-dsl/preview && npm run dev
```

Ask the user to confirm the page is ready for export, or proceed if they already confirmed.

### Step 3: Build with Vite

Run the production build:

```bash
cd /home/user/figma-component-dsl/preview && npx vite build
```

This generates optimized output in `preview/dist/`:
- `index.html` — Entry point with inlined critical CSS
- `assets/` — JS and CSS bundles

### Step 4: Create Self-Contained HTML

The Vite build produces separate JS/CSS files. To create a truly self-contained single HTML file:

1. Read `preview/dist/index.html`
2. Read all referenced CSS files from `preview/dist/assets/*.css`
3. Read all referenced JS files from `preview/dist/assets/*.js`
4. Inline the CSS into `<style>` tags in the `<head>`
5. Inline the JS into `<script>` tags before `</body>`
6. Write the combined file to the user's specified output path

If the user just wants the standard Vite build output (not inlined), copy `preview/dist/` as-is.

### Step 5: Handle External Assets

Check for external asset references in the built HTML:

- **SVG icons** — If using lucide-react, these are already inlined as SVG elements (no action needed)
- **External images** — Images loaded via URL (e.g., dicebear avatars) remain as URLs. Warn the user these require internet access
- **Fonts** — If using Google Fonts or similar, the `@import` or `<link>` stays. Warn the user or offer to download and inline
- **Large images** — If local images are referenced, copy them alongside the HTML or inline as base64 (for small images only)

### Step 6: Copy to Output

Copy the final HTML file to the user-specified path:

```bash
cp preview/dist/index.html /path/to/output.html
```

Default output path if none specified: `output/{PageName}.html`

### Step 7: Verify Output

Confirm the export:
- Report file size
- List any external dependencies (URLs that require internet)
- Note if responsive behavior is preserved (it should be, since CSS is included)
- Suggest opening in a browser to verify

## Asset Handling Reference

| Asset Type | Handling | Notes |
|------------|----------|-------|
| CSS | Inlined by Vite build | Design tokens included |
| JS (React) | Bundled and inlined | Runtime included |
| SVG icons | Inlined as SVG elements | lucide-react renders inline |
| External images | Kept as URLs | Requires internet |
| Local images | Copied or base64 inlined | Base64 only for < 10KB |
| Fonts | Kept as external links | Requires internet |

## Tips

- Always build from a clean state: `rm -rf preview/dist` before building
- The build includes React runtime — the HTML is fully standalone
- For sharing, a single inlined HTML file is most portable
- For deployment, the multi-file dist output is more cache-friendly
- Responsive styles are preserved — the page works on mobile
- Dark mode support (if present) is preserved via CSS media queries
