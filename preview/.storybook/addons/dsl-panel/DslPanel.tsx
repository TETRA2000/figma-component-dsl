import React, { useState } from 'react';
import { useParameter } from 'storybook/manager-api';

type ViewMode = 'react' | 'dsl' | 'side-by-side';
type ActiveTab = 'source' | 'json' | 'preview';

interface DslPanelParameters {
  source: string | null;
  compiledJson: string | null;
  renderedPngUrl: string | null;
  error: string | null;
}

const tabStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 500,
  borderBottom: '2px solid transparent',
  color: '#6b7280',
};

const activeTabStyle: React.CSSProperties = {
  ...tabStyle,
  borderBottomColor: '#7c3aed',
  color: '#7c3aed',
};

const codeBlockStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  fontSize: '12px',
  lineHeight: '1.5',
  padding: '16px',
  background: '#1e1e2e',
  color: '#cdd6f4',
  borderRadius: '8px',
  overflow: 'auto',
  whiteSpace: 'pre',
  margin: '0 16px',
  maxHeight: '60vh',
};

const buttonStyle: React.CSSProperties = {
  padding: '4px 12px',
  fontSize: '12px',
  background: '#f3f4f6',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  cursor: 'pointer',
  color: '#374151',
};

const viewToggleStyle: React.CSSProperties = {
  ...buttonStyle,
  padding: '4px 10px',
};

const activeViewToggleStyle: React.CSSProperties = {
  ...viewToggleStyle,
  background: '#7c3aed',
  color: '#ffffff',
  borderColor: '#7c3aed',
};

export function DslPanel() {
  const dsl = useParameter<DslPanelParameters | undefined>('dsl');
  const [activeTab, setActiveTab] = useState<ActiveTab>('source');
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  if (!dsl || (!dsl.source && !dsl.compiledJson && !dsl.renderedPngUrl && !dsl.error)) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>
        <p style={{ fontSize: '14px' }}>No DSL definition exists yet for this component.</p>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          Add a <code>.dsl.ts</code> file in <code>examples/</code> to see it here.
        </p>
      </div>
    );
  }

  if (dsl.error) {
    return (
      <div style={{ padding: '16px' }}>
        <div style={{
          padding: '12px 16px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          fontSize: '13px',
        }}>
          <strong>DSL Error:</strong> {dsl.error}
        </div>
      </div>
    );
  }

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', padding: '0 16px' }}>
        {(['source', 'json', 'preview'] as const).map((tab) => (
          <button
            key={tab}
            style={activeTab === tab ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'source' ? 'Source Code' : tab === 'json' ? 'Compiled JSON' : 'Rendered Preview'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 0' }}>
        {activeTab === 'source' && dsl.source && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px 8px' }}>
              <button
                style={buttonStyle}
                onClick={() => copyToClipboard(dsl.source!, 'Source copied!')}
              >
                {copyFeedback === 'Source copied!' ? 'Copied!' : 'Copy Source'}
              </button>
            </div>
            <pre style={codeBlockStyle}>{dsl.source}</pre>
          </div>
        )}

        {activeTab === 'json' && dsl.compiledJson && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px 8px' }}>
              <button
                style={buttonStyle}
                onClick={() => copyToClipboard(dsl.compiledJson!, 'JSON copied!')}
              >
                {copyFeedback === 'JSON copied!' ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
            <pre style={codeBlockStyle}>{dsl.compiledJson}</pre>
          </div>
        )}

        {activeTab === 'preview' && (
          <div>
            {/* View mode toggle */}
            <div style={{ display: 'flex', gap: '4px', padding: '0 16px 16px' }}>
              {(['react', 'dsl', 'side-by-side'] as const).map((mode) => (
                <button
                  key={mode}
                  style={viewMode === mode ? activeViewToggleStyle : viewToggleStyle}
                  onClick={() => setViewMode(mode)}
                >
                  {mode === 'react' ? 'React' : mode === 'dsl' ? 'DSL' : 'Side-by-side'}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '0 16px',
              ...(viewMode === 'side-by-side' ? {} : {}),
            }}>
              {(viewMode === 'react' || viewMode === 'side-by-side') && (
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}>
                    React
                  </div>
                  <div style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: '#fafafa',
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '13px',
                  }}>
                    See canvas above
                  </div>
                </div>
              )}
              {(viewMode === 'dsl' || viewMode === 'side-by-side') && dsl.renderedPngUrl && (
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}>
                    DSL Rendered
                  </div>
                  <div style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: '#ffffff',
                  }}>
                    <img
                      src={dsl.renderedPngUrl}
                      alt="DSL Rendered Preview"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
