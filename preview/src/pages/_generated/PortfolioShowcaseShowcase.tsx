import { ProjectCard } from '../../components/_generated/ProjectCard/ProjectCard';
import { SkillTag } from '../../components/_generated/SkillTag/SkillTag';
import { ContactButton } from '../../components/_generated/ContactButton/ContactButton';

export function PortfolioShowcaseShowcase() {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <div style={{ padding: '80px 120px 0', textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 4,
            background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
            borderRadius: 2,
            margin: '0 auto 32px',
          }}
        />
        <h1
          style={{
            color: '#f5f5f5',
            fontSize: 56,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          John Designer
        </h1>
        <p
          style={{
            color: '#a0a0a0',
            fontSize: 18,
            margin: '16px 0 0',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          Product Designer &amp; Creative Director
        </p>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '48px 120px 0',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        {['Work', 'About', 'Skills', 'Contact'].map((link) => (
          <span
            key={link}
            style={{
              color: '#a0a0a0',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}
          >
            {link}
          </span>
        ))}
      </nav>

      {/* Projects Section */}
      <div style={{ padding: '64px 120px 0' }}>
        <h2
          style={{
            color: '#f5f5f5',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 32px',
          }}
        >
          Selected Work
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <ProjectCard
            title="Brand Identity Redesign"
            description="A complete visual overhaul for a fintech startup, including logo, typography, and brand guidelines."
            tags={['Branding', 'Visual Design']}
            accentColor="#6366f1"
          />
          <ProjectCard
            title="E-Commerce Experience"
            description="End-to-end design for a luxury retail platform focused on storytelling and immersive product pages."
            tags={['UX Design', 'E-Commerce']}
            accentColor="#ec4899"
          />
          <ProjectCard
            title="Mobile Health App"
            description="A wellness tracking app combining clean data visualization with calming, accessible interface patterns."
            tags={['Mobile', 'Health Tech']}
            accentColor="#10b981"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div style={{ padding: '80px 120px 0', textAlign: 'center' }}>
        <h2
          style={{
            color: '#f5f5f5',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 32px',
          }}
        >
          Skills &amp; Expertise
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SkillTag label="UI Design" />
          <SkillTag label="UX Research" />
          <SkillTag label="Figma" />
          <SkillTag label="Prototyping" />
          <SkillTag label="Design Systems" />
          <SkillTag label="Typography" />
          <SkillTag label="Motion Design" />
          <SkillTag label="Branding" />
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ padding: '80px 120px 80px', textAlign: 'center' }}>
        <h2
          style={{
            color: '#f5f5f5',
            fontSize: 32,
            fontWeight: 700,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          Let's Work Together
        </h2>
        <p
          style={{
            color: '#a0a0a0',
            fontSize: 16,
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          Have a project in mind? I'd love to hear about it.
        </p>
        <ContactButton label="Get in Touch" />
      </div>
    </div>
  );
}
