/**
 * Shared configuration for visual regression tests.
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname2 = dirname(fileURLToPath(import.meta.url));

/** All 18 visual regression test pages (one per category). */
export const VISUAL_REGRESSION_PAGES = [
  'layout-horizontal-01',
  'layout-vertical-01',
  'layout-nested-01',
  'layout-sizing-01',
  'typography-01',
  'colors-solid-01',
  'colors-gradient-01',
  'borders-strokes-01',
  'corner-radius-01',
  'spacing-padding-01',
  'opacity-01',
  'clip-content-01',
  'cards-01',
  'navigation-01',
  'heroes-banners-01',
  'lists-grids-01',
  'badges-tags-01',
  'combined-complex-01',
];

/** Minimum similarity % for React screenshots vs committed baselines. */
export const REACT_SIMILARITY_THRESHOLD = parseFloat(
  process.env.REACT_SIMILARITY_THRESHOLD ?? '99.0',
);

/** Minimum similarity % for DSL renders vs committed baselines. */
export const DSL_SIMILARITY_THRESHOLD = parseFloat(
  process.env.DSL_SIMILARITY_THRESHOLD ?? '99.5',
);

/** Root directory for baseline PNGs. */
export const BASELINES_DIR = join(__dirname2, 'baselines');

/** React baseline directory. */
export const REACT_BASELINES_DIR = join(BASELINES_DIR, 'react');

/** DSL baseline directory. */
export const DSL_BASELINES_DIR = join(BASELINES_DIR, 'dsl');

/** Diff output directory (gitignored). */
export const DIFFS_DIR = join(BASELINES_DIR, 'diffs');

/** Test pages directory. */
export const TEST_PAGES_DIR = join(__dirname2, '../../test-pages');

/** Font directory for DSL text measurer and renderer. */
export const FONT_DIR = join(__dirname2, '../../../dsl-core/fonts');

/** CSS selector for the root element in test pages. */
export const ROOT_SELECTOR = '[data-testid="root"]';
