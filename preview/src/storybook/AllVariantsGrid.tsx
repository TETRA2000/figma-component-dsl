import type { ComponentType, CSSProperties } from 'react';

export interface VariantAxis<V = string | number | boolean> {
  prop: string;
  values: V[];
  labels?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AllVariantsGridProps {
  component: ComponentType<any>;
  axes: VariantAxis[];
  baseProps?: Record<string, unknown>;
  cellStyle?: CSSProperties;
}

const gridContainerStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
  padding: '16px',
};

const cellContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const labelStyle: CSSProperties = {
  fontSize: '11px',
  color: '#6b7280',
  fontFamily: 'monospace',
  textAlign: 'center',
};

const headerStyle: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#374151',
  fontFamily: 'monospace',
  textAlign: 'center',
  padding: '4px',
};

export function AllVariantsGrid({
  component: Component,
  axes,
  baseProps = {},
  cellStyle,
}: AllVariantsGridProps) {
  if (axes.length === 0) return null;

  const getLabel = (axis: VariantAxis, index: number): string => {
    return axis.labels?.[index] ?? String(axis.values[index]);
  };

  // Single axis: horizontal row
  if (axes.length === 1) {
    const axis = axes[0];
    return (
      <div style={{ ...gridContainerStyle, gridTemplateColumns: `repeat(${axis.values.length}, 1fr)` }}>
        {axis.values.map((value, i) => (
          <div key={String(value)} style={cellContainerStyle}>
            <div style={labelStyle}>{`${axis.prop}: ${getLabel(axis, i)}`}</div>
            <div style={cellStyle}>
              <Component {...baseProps} {...{ [axis.prop]: value }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Two axes: grid with row/column headers
  const rowAxis = axes[0];
  const colAxis = axes[1];

  return (
    <div
      style={{
        ...gridContainerStyle,
        gridTemplateColumns: `auto repeat(${colAxis.values.length}, 1fr)`,
        gridTemplateRows: `auto repeat(${rowAxis.values.length}, auto)`,
      }}
    >
      {/* Empty top-left corner */}
      <div />
      {/* Column headers */}
      {colAxis.values.map((value, i) => (
        <div key={`col-${String(value)}`} style={headerStyle}>
          {`${colAxis.prop}: ${getLabel(colAxis, i)}`}
        </div>
      ))}
      {/* Rows */}
      {rowAxis.values.map((rowValue, ri) => (
        <>
          {/* Row header */}
          <div key={`row-header-${String(rowValue)}`} style={{ ...headerStyle, display: 'flex', alignItems: 'center' }}>
            {`${rowAxis.prop}: ${getLabel(rowAxis, ri)}`}
          </div>
          {/* Cells */}
          {colAxis.values.map((colValue) => (
            <div key={`${String(rowValue)}-${String(colValue)}`} style={{ ...cellContainerStyle, ...cellStyle }}>
              <Component
                {...baseProps}
                {...{ [rowAxis.prop]: rowValue, [colAxis.prop]: colValue }}
              />
            </div>
          ))}
        </>
      ))}
    </div>
  );
}
