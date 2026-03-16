import { useState, useEffect, useRef, type CSSProperties } from 'react';
import styles from './DslCanvas.module.css';

/** Compiled DSL node — matches FigmaNodeDict shape from @figma-dsl/compiler */
interface FigmaNodeDict {
  type: string;
  name: string;
  size: { x: number; y: number };
  [key: string]: unknown;
}

export interface DslCanvasProps {
  /** Compiled DSL JSON to render */
  dsl: FigmaNodeDict;
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

export function DslCanvas({
  dsl,
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

  useEffect(() => {
    if (!dsl || !dsl.type || !dsl.size) {
      setError('Invalid DSL input');
      setDataUrl(null);
      setDimensions(null);
      return;
    }

    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRendering(true);
    setError(null);

    fetch('/api/dsl-canvas/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dsl, scale }),
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
  }, [dsl, scale]);

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
