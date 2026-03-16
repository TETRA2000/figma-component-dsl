import { ArticleCard } from '../../components/_generated/ArticleCard/ArticleCard';
import { TagPill } from '../../components/_generated/TagPill/TagPill';
import { AuthorByline } from '../../components/_generated/AuthorByline/AuthorByline';
import { Blockquote } from '../../components/_generated/Blockquote/Blockquote';

export function MinimalBlogShowcase() {
  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '48px 120px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#1c1917', fontSize: 40, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
          The Minimalist
        </h1>
        <p style={{ color: '#78716c', fontSize: 16, margin: '8px 0 0' }}>
          Thoughts on design, craft, and the spaces between
        </p>
      </div>

      {/* Tag pills */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: '24px 120px' }}>
        <TagPill label="All" />
        <TagPill label="Design" />
        <TagPill label="Technology" />
        <TagPill label="Culture" />
        <TagPill label="Process" />
      </div>

      {/* Featured article */}
      <div style={{ padding: '0 120px 32px' }}>
        <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e7e5e4', display: 'flex' }}>
          <div style={{ width: 480, minHeight: 300, background: '#f5f5f4', flexShrink: 0 }} />
          <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Featured</span>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1c1917', margin: 0, lineHeight: 1.3 }}>
              Why Less is More: The Philosophy of Reduction
            </h2>
            <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.7, margin: 0 }}>
              In a world overwhelmed by excess, the greatest challenge for designers is knowing what to remove. This article explores the enduring power of minimalism.
            </p>
            <AuthorByline name="Elena Vasquez" role="Senior Designer" />
          </div>
        </div>
      </div>

      {/* Blockquote */}
      <div style={{ padding: '0 120px 32px', maxWidth: 700 }}>
        <Blockquote />
      </div>

      {/* Article grid */}
      <div style={{ padding: '0 120px 48px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1c1917', margin: '0 0 20px' }}>Latest Articles</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <ArticleCard title="The Art of Simplicity in Design" excerpt="Exploring how minimalist approaches lead to better user experiences." date="Mar 12, 2026" tag="Design" />
          <ArticleCard title="Typography as a Design Tool" excerpt="How typeface choices communicate mood and meaning beyond words." date="Mar 8, 2026" tag="Craft" />
          <ArticleCard title="Space: The Invisible Element" excerpt="Understanding negative space and its role in visual hierarchy." date="Mar 3, 2026" tag="Process" />
        </div>
      </div>
    </div>
  );
}
