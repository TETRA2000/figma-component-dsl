# Design Token Reference

Complete reference of all CSS custom properties (design tokens) defined in the design system. Tokens are defined in `src/components/tokens.css` and support both light and dark mode via `prefers-color-scheme`.

---

## Colors

### Primary Palette

| Token                   | Value     |
|-------------------------|-----------|
| `--color-primary-50`    | `#f5f3ff` |
| `--color-primary-100`   | `#ede9fe` |
| `--color-primary-200`   | `#ddd6fe` |
| `--color-primary-300`   | `#c4b5fd` |
| `--color-primary-400`   | `#a78bfa` |
| `--color-primary-500`   | `#8b5cf6` |
| `--color-primary-600`   | `#7c3aed` |
| `--color-primary-700`   | `#6d28d9` |
| `--color-primary-800`   | `#5b21b6` |
| `--color-primary-900`   | `#4c1d95` |

### Accent Colors

#### Electric Pink

| Token               | Value     |
|---------------------|-----------|
| `--color-pink-400`  | `#f472b6` |
| `--color-pink-500`  | `#ec4899` |
| `--color-pink-600`  | `#db2777` |

#### Vivid Orange

| Token                 | Value     |
|-----------------------|-----------|
| `--color-orange-400`  | `#fb923c` |
| `--color-orange-500`  | `#f97316` |
| `--color-orange-600`  | `#ea580c` |

#### Bright Cyan

| Token               | Value     |
|---------------------|-----------|
| `--color-cyan-400`  | `#22d3ee` |
| `--color-cyan-500`  | `#06b6d4` |
| `--color-cyan-600`  | `#0891b2` |

#### Success Green

| Token                | Value     |
|----------------------|-----------|
| `--color-green-400`  | `#4ade80` |
| `--color-green-500`  | `#22c55e` |
| `--color-green-600`  | `#16a34a` |

### Neutrals

| Token               | Value     |
|---------------------|-----------|
| `--color-gray-50`   | `#f9fafb` |
| `--color-gray-100`  | `#f3f4f6` |
| `--color-gray-200`  | `#e5e7eb` |
| `--color-gray-300`  | `#d1d5db` |
| `--color-gray-400`  | `#9ca3af` |
| `--color-gray-500`  | `#6b7280` |
| `--color-gray-600`  | `#4b5563` |
| `--color-gray-700`  | `#374151` |
| `--color-gray-800`  | `#1f2937` |
| `--color-gray-900`  | `#111827` |
| `--color-gray-950`  | `#030712` |
| `--color-white`     | `#ffffff` |
| `--color-black`     | `#000000` |

### Semantic Tokens

These tokens alias raw color values and change automatically between light and dark mode.

#### Light Mode (default)

| Token              | Value                        |
|--------------------|------------------------------|
| `--text-primary`   | `var(--color-gray-900)`      |
| `--text-secondary` | `var(--color-gray-600)`      |
| `--text-tertiary`  | `var(--color-gray-400)`      |
| `--text-inverse`   | `var(--color-white)`         |
| `--text-accent`    | `var(--color-primary-600)`   |
| `--bg-primary`     | `var(--color-white)`         |
| `--bg-secondary`   | `var(--color-gray-50)`       |
| `--bg-tertiary`    | `var(--color-gray-100)`      |
| `--bg-inverse`     | `var(--color-gray-900)`      |
| `--border-default` | `var(--color-gray-200)`      |
| `--border-strong`  | `var(--color-gray-300)`      |

#### Dark Mode (`prefers-color-scheme: dark`)

| Token              | Value                        |
|--------------------|------------------------------|
| `--text-primary`   | `var(--color-gray-100)`      |
| `--text-secondary` | `var(--color-gray-400)`      |
| `--text-tertiary`  | `var(--color-gray-500)`      |
| `--text-inverse`   | `var(--color-gray-900)`      |
| `--text-accent`    | `var(--color-primary-400)`   |
| `--bg-primary`     | `var(--color-gray-950)`      |
| `--bg-secondary`   | `var(--color-gray-900)`      |
| `--bg-tertiary`    | `var(--color-gray-800)`      |
| `--bg-inverse`     | `var(--color-white)`         |
| `--border-default` | `var(--color-gray-800)`      |
| `--border-strong`  | `var(--color-gray-700)`      |

---

## Gradients

### Light Mode

| Token               | Value                                                                         |
|----------------------|-------------------------------------------------------------------------------|
| `--gradient-primary` | `linear-gradient(135deg, #7c3aed, #4f46e5)`                                  |
| `--gradient-hero`    | `linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)`             |
| `--gradient-cta`     | `linear-gradient(135deg, #6d28d9 0%, #db2777 100%)`                          |
| `--gradient-subtle`  | `linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 50%, #fff7ed 100%)`            |
| `--gradient-dark`    | `linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)`            |
| `--gradient-text`    | `linear-gradient(135deg, #7c3aed, #ec4899, #f97316)`                        |
| `--gradient-card`    | `linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(236, 72, 153, 0.05))` |

### Dark Mode Overrides

| Token               | Value                                                                                            |
|----------------------|--------------------------------------------------------------------------------------------------|
| `--gradient-subtle`  | `linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%)` |
| `--gradient-card`    | `linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))`                     |

---

## Shadows

### Light Mode

| Token              | Value                                                                             |
|--------------------|-----------------------------------------------------------------------------------|
| `--shadow-sm`      | `0 1px 2px rgba(0, 0, 0, 0.05)`                                                  |
| `--shadow-md`      | `0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)`        |
| `--shadow-lg`      | `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)`      |
| `--shadow-xl`      | `0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`     |
| `--shadow-colored` | `0 10px 30px -5px rgba(124, 58, 237, 0.25)`                                      |
| `--shadow-pink`    | `0 10px 30px -5px rgba(236, 72, 153, 0.2)`                                       |
| `--shadow-glow`    | `0 0 40px rgba(124, 58, 237, 0.15)`                                              |

### Dark Mode Overrides

| Token              | Value                                                                             |
|--------------------|-----------------------------------------------------------------------------------|
| `--shadow-sm`      | `0 1px 2px rgba(0, 0, 0, 0.3)`                                                   |
| `--shadow-md`      | `0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)`          |
| `--shadow-lg`      | `0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)`        |
| `--shadow-xl`      | `0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)`       |
| `--shadow-colored` | `0 10px 30px -5px rgba(139, 92, 246, 0.3)`                                       |
| `--shadow-pink`    | `0 10px 30px -5px rgba(236, 72, 153, 0.25)`                                      |
| `--shadow-glow`    | `0 0 40px rgba(139, 92, 246, 0.2)`                                               |

---

## Spacing

| Token        | Value  |
|--------------|--------|
| `--space-1`  | `4px`  |
| `--space-2`  | `8px`  |
| `--space-3`  | `12px` |
| `--space-4`  | `16px` |
| `--space-5`  | `20px` |
| `--space-6`  | `24px` |
| `--space-8`  | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |
| `--space-24` | `96px` |

---

## Border Radius

| Token           | Value    |
|-----------------|----------|
| `--radius-sm`   | `6px`    |
| `--radius-md`   | `10px`   |
| `--radius-lg`   | `16px`   |
| `--radius-xl`   | `24px`   |
| `--radius-2xl`  | `32px`   |
| `--radius-full` | `9999px` |

---

## Typography

### Font Families

| Token        | Value                                                                  |
|--------------|------------------------------------------------------------------------|
| `--font-sans` | `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`  |
| `--font-mono` | `'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace` |

### Font Sizes

| Token       | Value       |
|-------------|-------------|
| `--text-xs`  | `0.75rem`  |
| `--text-sm`  | `0.875rem` |
| `--text-base`| `1rem`     |
| `--text-lg`  | `1.125rem` |
| `--text-xl`  | `1.25rem`  |
| `--text-2xl` | `1.5rem`   |
| `--text-3xl` | `1.875rem` |
| `--text-4xl` | `2.25rem`  |
| `--text-5xl` | `3rem`     |
| `--text-6xl` | `3.75rem`  |

### Line Heights

| Token              | Value  |
|--------------------|--------|
| `--leading-tight`  | `1.15` |
| `--leading-snug`   | `1.3`  |
| `--leading-normal` | `1.5`  |
| `--leading-relaxed`| `1.65` |

### Letter Spacing

| Token              | Value       |
|--------------------|-------------|
| `--tracking-tight` | `-0.025em` |
| `--tracking-normal`| `0`        |
| `--tracking-wide`  | `0.025em`  |

---

## Transitions

| Token              | Value                                    |
|--------------------|------------------------------------------|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)`   |
| `--transition-base` | `250ms cubic-bezier(0.4, 0, 0.2, 1)`   |
| `--transition-slow` | `350ms cubic-bezier(0.4, 0, 0.2, 1)`   |

---

## Z-Index

| Token          | Value |
|----------------|-------|
| `--z-dropdown` | `10`  |
| `--z-sticky`   | `20`  |
| `--z-overlay`  | `30`  |
| `--z-modal`    | `40`  |

---

## Container Widths

| Token              | Value    |
|--------------------|----------|
| `--container-sm`   | `640px`  |
| `--container-md`   | `768px`  |
| `--container-lg`   | `1024px` |
| `--container-xl`   | `1200px` |
