import { useState, useEffect, useRef, type CSSProperties } from 'react';
import styles from './DslCanvas.module.css';

/** Compiled DSL node — matches FigmaNodeDict shape from @figma-dsl/compiler */
interface FigmaNodeDict {
  type: string;
  name: string;
  size: { x: number; y: number };
  [key: string]: unknown;
}

/** Pre-bundled image from Figma plugin export */
export interface BundledImage {
  /** Base64 data URL or file path */
  dataUrl: string;
  /** Pixel width of the image */
  width: number;
  /** Pixel height of the image */
  height: number;
  /** Source classification */
  sourceType: 'dslCanvas' | 'nativeSlot';
}

export interface DslCanvasProps {
  /** Compiled DSL JSON to render (used when no bundledImage) */
  dsl?: FigmaNodeDict;
  /** Pre-bundled image from export package — takes priority over dsl */
  bundledImage?: BundledImage;
  /** Slot override content keyed by slot name — compiled node arrays merged into DSL children before rendering */
  slotOverrides?: Record<string, FigmaNodeDict[]>;
  /** Display width in pixels; height auto-calculated from aspect ratio */
  width?: number;
  /** Render scale factor for high-DPI (default: 1) */
  scale?: number;
  /** CSS class name for layout integration */
  className?: string;
  /** Inline styles for layout integration */
  style?: CSSProperties;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Apply slot overrides by replacing slot placeholder children with override content.
 * Walks the DSL tree and replaces children of nodes whose name matches a slot key.
 */
function applySlotOverrides(
  node: FigmaNodeDict,
  overrides: Record<string, FigmaNodeDict[]>,
): FigmaNodeDict {
  const children = (node as { children?: FigmaNodeDict[] }).children;
  const newChildren = children?.map((child) => {
    if (child.name && overrides[child.name]) {
      return { ...child, children: overrides[child.name] };
    }
    return applySlotOverrides(child, overrides);
  });
  return newChildren ? { ...node, children: newChildren } : node;
}

export function DslCanvas({
  dsl,
  bundledImage,
  slotOverrides,
  width,
  scale = 1,
  className,
  style,
  alt = 'DSL rendered content',
}: DslCanvasProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Server-side render effect — skipped when bundledImage is provided
  useEffect(() => {
    // When bundledImage is provided, skip server-side rendering entirely
    if (bundledImage) return;

    if (!dsl || !dsl.type || !dsl.size) {
      setError('Invalid DSL input');
      setDataUrl(null);
      setDimensions(null);
      return;
    }

    // Merge slot overrides into DSL tree if provided
    const resolvedDsl = slotOverrides && Object.keys(slotOverrides).length > 0
      ? applySlotOverrides(dsl, slotOverrides)
      : dsl;

    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRendering(true);
    setError(null);

    fetch('/api/dsl-canvas/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dsl: resolvedDsl, scale }),
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error(`Render failed: ${res.status}`);
        return res.json();
      })
      .then((data: { dataUrl: string; width: number; height: number }) => {
        if (!controller.signal.aborted) {
          setDataUrl(data.dataUrl);
          setDimensions({ width: data.width, height: data.height });
          setIsRendering(false);
        }
      })
      .catch(err => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : String(err));
        setIsRendering(false);
      });

    return () => { controller.abort(); };
  }, [dsl, bundledImage, slotOverrides, scale]);

  // When bundledImage is provided, use it directly — no server-side render needed.
  // This is the only rendering path for nativeSlot images (no DSL representation).
  if (bundledImage) {
    const bundledAspectRatio = bundledImage.width / bundledImage.height;
    const bundledContainerStyle: CSSProperties = {
      ...style,
      width: width ? `${width}px` : undefined,
      aspectRatio: `${bundledAspectRatio}`,
    };
    return (
      <div className={`${styles.container} ${className ?? ''}`} style={bundledContainerStyle}>
        <img
          className={styles.image}
          src={bundledImage.dataUrl}
          alt={alt}
          width={width}
          style={{ aspectRatio: `${bundledAspectRatio}` }}
        />
      </div>
    );
  }

  const aspectRatio = dimensions ? dimensions.width / dimensions.height : undefined;

  const containerStyle: CSSProperties = {
    ...style,
    width: width ? `${width}px` : undefined,
    aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
  };

  if (error || (!dataUrl && !isRendering)) {
    return (
      <div
        className={`${styles.placeholder} ${className ?? ''}`}
        style={containerStyle}
      >
        DslCanvas
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className ?? ''}`} style={containerStyle}>
      {dataUrl && (
        <img
          className={styles.image}
          src={dataUrl}
          alt={alt}
          width={width}
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
        />
      )}
      {isRendering && !dataUrl && (
        <div className={styles.placeholder}>Loading...</div>
      )}
    </div>
  );
}
