import React from 'react';

const pages = [
  { name: '企業トップ', slug: 'jp-corporate-top', desc: 'Corporate Top Page' },
  { name: '会社概要', slug: 'jp-about', desc: 'About / Company Overview' },
  { name: '事業紹介', slug: 'jp-services', desc: 'Business Services' },
  { name: '採用情報', slug: 'jp-careers', desc: 'Careers / Recruitment' },
  { name: 'IR情報', slug: 'jp-ir', desc: 'Investor Relations' },
  { name: 'お問い合わせ', slug: 'jp-contact', desc: 'Contact' },
  { name: 'ニュースリリース', slug: 'jp-news', desc: 'News Release' },
  { name: '製品・ソリューション', slug: 'jp-products', desc: 'Products & Solutions' },
  { name: '技術紹介', slug: 'jp-technology', desc: 'Technology' },
  { name: 'CSR・サステナビリティ', slug: 'jp-csr', desc: 'CSR / Sustainability' },
  { name: '代表メッセージ', slug: 'jp-ceo-message', desc: 'CEO Message' },
  { name: '拠点情報', slug: 'jp-locations', desc: 'Office Locations' },
  { name: 'パートナー企業', slug: 'jp-partners', desc: 'Partners' },
  { name: '導入事例', slug: 'jp-case-studies', desc: 'Case Studies' },
  { name: 'セミナー・イベント', slug: 'jp-events', desc: 'Seminars & Events' },
  { name: '資料ダウンロード', slug: 'jp-downloads', desc: 'Downloads / Resources' },
  { name: 'よくあるご質問', slug: 'jp-faq', desc: 'FAQ' },
  { name: '沿革', slug: 'jp-history', desc: 'Company History' },
  { name: 'グループ企業', slug: 'jp-group', desc: 'Group Companies' },
  { name: 'プライバシーポリシー', slug: 'jp-privacy', desc: 'Privacy Policy' },
];

export function DogfoodingGallery() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
        padding: '48px 64px',
        color: '#ffffff',
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: 2 }}>
          日本企業コーポレートサイト
        </h1>
        <p style={{ fontSize: 16, opacity: 0.8, marginTop: 8 }}>
          Japanese Corporate Website — 20 Page Dogfooding Gallery
        </p>
        <div style={{
          display: 'flex', gap: 24, marginTop: 24, fontSize: 14, opacity: 0.7,
        }}>
          <span>Pages: {pages.length}</span>
          <span>Width: 1440px</span>
          <span>Theme: Japanese Corporate</span>
          <span>Date: 2026-03-15</span>
        </div>
      </header>

      {/* Page Grid */}
      <section style={{ padding: '48px 64px', background: '#f5f5f5' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a365d', marginBottom: 32 }}>
          ページ一覧 — Page Index
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}>
          {pages.map((page, i) => (
            <div
              key={page.slug}
              style={{
                background: '#ffffff',
                borderRadius: 8,
                padding: 20,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
              }}
            >
              <div style={{
                fontSize: 11, color: '#2563eb', fontWeight: 600,
                marginBottom: 8, letterSpacing: 1,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a365d', margin: 0 }}>
                {page.name}
              </h3>
              <p style={{ fontSize: 12, color: '#718096', margin: '4px 0 0' }}>
                {page.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Individual Page Sections */}
      {pages.map((page, i) => (
        <PageSection key={page.slug} page={page} index={i} />
      ))}

      {/* Footer */}
      <footer style={{
        background: '#1a365d',
        color: '#ffffff',
        padding: '32px 64px',
        textAlign: 'center',
        fontSize: 13,
        opacity: 0.7,
      }}>
        Dogfooding Gallery — Generated 2026-03-15 — 20 Japanese Corporate Pages
      </footer>
    </div>
  );
}

function PageSection({ page, index }: { page: typeof pages[number]; index: number }) {
  return (
    <section style={{
      padding: '48px 64px',
      borderBottom: '1px solid #e2e8f0',
      background: index % 2 === 0 ? '#ffffff' : '#fafafa',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
        <span style={{
          fontSize: 48, fontWeight: 700, color: '#e2e8f0', lineHeight: 1,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a365d', margin: 0 }}>
            {page.name}
          </h2>
          <p style={{ fontSize: 14, color: '#718096', margin: '4px 0 0' }}>
            {page.desc} — {page.slug}.dsl.ts
          </p>
        </div>
      </div>
      <div style={{
        background: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center',
        fontSize: 14,
        color: '#a0aec0',
      }}>
        DSL render: dogfooding/20260315-japanese-corporate/renders/{page.slug}.png
      </div>
    </section>
  );
}
