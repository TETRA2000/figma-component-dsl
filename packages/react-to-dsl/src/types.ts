/**
 * Types for the browser-based DOM extraction and DSL conversion pipeline.
 */

/** Bounding rectangle of a DOM element */
export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Computed styles extracted from a DOM element via getComputedStyle() */
export interface ExtractedStyles {
  // Layout
  display: string;
  flexDirection: string;
  gap: string;
  rowGap: string;
  columnGap: string;
  justifyContent: string;
  alignItems: string;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;

  // Padding
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;

  // Size
  width: string;
  height: string;
  minWidth: string;
  minHeight: string;
  maxWidth: string;
  maxHeight: string;
  boxSizing: string;

  // Visual
  backgroundColor: string;
  backgroundImage: string;
  opacity: string;
  overflow: string;

  // Border
  borderTopWidth: string;
  borderRightWidth: string;
  borderBottomWidth: string;
  borderLeftWidth: string;
  borderTopColor: string;
  borderRightColor: string;
  borderBottomColor: string;
  borderLeftColor: string;
  borderTopStyle: string;
  borderRightStyle: string;
  borderBottomStyle: string;
  borderLeftStyle: string;

  // Border radius
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;

  // Margin (for inferring spacing in block layout)
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;

  // Typography
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  textAlign: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration: string;
  whiteSpace: string;
}

/** A snapshot of a DOM element with its computed styles and children */
export interface DomSnapshot {
  /** HTML tag name (lowercase) */
  tag: string;
  /** Element id attribute */
  id: string;
  /** CSS class names (space-separated) */
  className: string;
  /** Text content (only for leaf text nodes) */
  textContent: string;
  /** Whether this element contains ONLY text (no child elements) */
  isTextOnly: boolean;
  /** Computed styles */
  styles: ExtractedStyles;
  /** Bounding rectangle */
  rect: BoundingRect;
  /** Child element snapshots */
  children: DomSnapshot[];
  /** Image src for <img> elements */
  imgSrc?: string;
}

/** Options for the DOM extraction */
export interface ExtractOptions {
  /** URL to navigate to */
  url: string;
  /** CSS selector for the root element to extract (default: '#root > *') */
  selector?: string;
  /** Viewport width (default: 1280) */
  viewportWidth?: number;
  /** Viewport height (default: 720) */
  viewportHeight?: number;
}

/** Options for the DSL code generation */
export interface CodegenOptions {
  /** Component name for the root node */
  componentName?: string;
  /** Whether to use component() instead of frame() for root */
  asComponent?: boolean;
  /** Indentation string (default: '  ' = 2 spaces) */
  indent?: string;
}

/** Result of a single conversion */
export interface ConvertResult {
  /** Generated DSL source code */
  dslCode: string;
  /** Warnings about unsupported CSS features */
  warnings: string[];
  /** The intermediate DslNode tree (for inspection) */
  nodeCount: number;
}

/** Result of a batch comparison */
export interface ComparisonResult {
  name: string;
  category: string;
  reactVsScript: number;
  reactVsAi?: number;
  scriptVsAi?: number;
  scriptDslValid: boolean;
  aiDslValid?: boolean;
  warnings: string[];
  status: 'PASS' | 'FAIL' | 'ERROR';
  error?: string;
}

/** Summary of a batch comparison run */
export interface ComparisonReport {
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  errors: number;
  averageSimilarity: number;
  worstCases: ComparisonResult[];
  byCategory: Record<string, {
    count: number;
    avgSimilarity: number;
    passed: number;
  }>;
  results: ComparisonResult[];
}
