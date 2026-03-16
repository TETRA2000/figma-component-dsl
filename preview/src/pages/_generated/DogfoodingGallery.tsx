import { useState } from 'react';
import { DslCanvas } from '../../components/DslCanvas/DslCanvas';

interface IterationEntry {
  name: string;
  theme: string;
  reactContent: React.ReactNode;
  dslJson?: Record<string, unknown>;
}

const iterations: IterationEntry[] = [];

export function registerIteration(entry: IterationEntry) {
  iterations.push(entry);
}

export function DogfoodingGallery() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'react' | 'dsl'>('side-by-side');

  if (iterations.length === 0) {
    return (
      <div style={{ padding: 40, fontFamily: 'Inter, sans-serif', color: '#666' }}>
        <h1 style={{ fontSize: 24, color: '#333' }}>Dogfooding Gallery</h1>
        <p>No iterations registered yet. Components will appear here as they are created.</p>
      </div>
    );
  }

  const current = iterations[activeTab];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ background: '#1a1a2e', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <h1 style={{ fontSize: 18, margin: 0, fontWeight: 600 }}>Dogfooding Gallery</h1>
        <span style={{ fontSize: 13, opacity: 0.6 }}>{iterations.length} iterations</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {(['side-by-side', 'react', 'dsl'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: viewMode === mode ? '#4f46e5' : '#333',
                color: '#fff', fontSize: 12, fontWeight: 500,
              }}
            >
              {mode === 'side-by-side' ? 'Side by Side' : mode === 'react' ? 'React' : 'DSL Canvas'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '8px 24px', background: '#e8e8e8', overflowX: 'auto' }}>
        {iterations.map((iter, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: activeTab === i ? '#4f46e5' : '#fff',
              color: activeTab === i ? '#fff' : '#333',
              fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
            }}
          >
            #{i + 1} {iter.theme}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {(viewMode === 'side-by-side' || viewMode === 'react') && (
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 13, color: '#666', margin: '0 0 12px', fontWeight: 600 }}>
              React (Browser)
            </h3>
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #ddd' }}>
              {current?.reactContent}
            </div>
          </div>
        )}
        {(viewMode === 'side-by-side' || viewMode === 'dsl') && current?.dslJson && (
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 13, color: '#666', margin: '0 0 12px', fontWeight: 600 }}>
              DSL Canvas (Pipeline)
            </h3>
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #ddd' }}>
              <DslCanvas
                dsl={current.dslJson as any}
                width={800}
                alt={`DSL render: ${current.theme}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
