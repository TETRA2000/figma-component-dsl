import React from 'react';

const colors = {
  bg: '#0a0a0a',
  bgAlt: '#111111',
  textPrimary: '#f5f5f7',
  textSecondary: '#86868b',
  accent: '#e63946',
};

const projects = [
  { category: 'Branding', title: 'Nike Rebrand', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' },
  { category: 'Web', title: 'Spotify Redesign', gradient: 'linear-gradient(135deg, #0d1117, #1db954, #191414)' },
  { category: 'App', title: 'Fintech Mobile', gradient: 'linear-gradient(135deg, #0a0a1e, #2d1b69, #5b21b6)' },
  { category: 'Motion', title: 'Nike Campaign', gradient: 'linear-gradient(135deg, #1c1c1c, #e63946, #2d2d2d)' },
];

const team = [
  { name: 'Sarah Chen', role: 'Creative Director', gradient: 'linear-gradient(180deg, #2d1b69, #16213e)' },
  { name: 'Marcus Webb', role: 'Lead Designer', gradient: 'linear-gradient(180deg, #1a3a2a, #0a1a10)' },
  { name: 'Yuki Tanaka', role: 'Developer', gradient: 'linear-gradient(180deg, #3a1b1b, #1a0a0a)' },
  { name: 'Ana Costa', role: 'Strategist', gradient: 'linear-gradient(180deg, #1b2a3a, #0a1520)' },
];

const stats = [
  { value: '150+', label: 'Projects' },
  { value: '12', label: 'Years' },
  { value: '40+', label: 'Awards' },
  { value: '25', label: 'Team Members' },
];

export function AwwwardsShowcase() {
  return (
    <div style={{ width: 1440, margin: '0 auto', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", background: colors.bg, color: colors.textPrimary }}>

      {/* ── Navigation Bar ── */}
      <nav style={{
        width: '100%',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        boxSizing: 'border-box',
        background: colors.bg,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' }}>
          STUDIO
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          {['Work', 'About', 'Team', 'Contact'].map((link) => (
            <span key={link} style={{ fontSize: 14, fontWeight: 400, color: colors.textSecondary, cursor: 'pointer', letterSpacing: 0.5 }}>
              {link}
            </span>
          ))}
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section style={{
        width: '100%',
        height: 800,
        background: 'linear-gradient(160deg, #0a0a1e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 60px 100px 60px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative accent line */}
        <div style={{
          position: 'absolute',
          top: 60,
          right: 60,
          width: 120,
          height: 2,
          backgroundColor: colors.accent,
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ margin: 0, fontSize: 80, fontWeight: 200, lineHeight: 1.05, letterSpacing: -1 }}>
            We Create
          </h1>
          <h1 style={{ margin: 0, fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Digital Experiences
          </h1>
          <p style={{
            marginTop: 32,
            fontSize: 18,
            fontWeight: 400,
            color: colors.textSecondary,
            maxWidth: 520,
            lineHeight: 1.6,
          }}>
            Award-winning digital agency specializing in brand, web, and motion design.
          </p>
        </div>
      </section>

      {/* ── Selected Work Grid ── */}
      <section style={{
        padding: '120px 60px',
        boxSizing: 'border-box',
        background: colors.bgAlt,
      }}>
        <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 60, marginTop: 0, letterSpacing: -1 }}>
          Selected Work
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          {projects.map((project) => (
            <div key={project.title} style={{
              width: '100%',
              height: 500,
              borderRadius: 16,
              background: project.gradient,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 200,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                zIndex: 2,
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: colors.accent, textTransform: 'uppercase', letterSpacing: 2 }}>
                  {project.category}
                </span>
                <h3 style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full-Width Editorial Strip ── */}
      <section style={{
        width: '100%',
        height: 600,
        background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 40%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }} />
        <h2 style={{
          position: 'relative',
          fontSize: 64,
          fontWeight: 200,
          letterSpacing: -1,
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.2,
          margin: 0,
        }}>
          Crafting stories through pixels
        </h2>
      </section>

      {/* ── About Section ── */}
      <section style={{
        padding: '120px 60px',
        boxSizing: 'border-box',
        display: 'flex',
        gap: 80,
        background: colors.bg,
      }}>
        {/* Left column */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.15, margin: 0, letterSpacing: -1 }}>
            We believe in the power of design to transform brands
          </h2>
        </div>
        {/* Right column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.75,
            color: colors.textSecondary,
            marginTop: 0,
            marginBottom: 48,
          }}>
            Founded in 2012, Studio has grown from a small design shop into a full-service
            creative agency. We partner with forward-thinking brands to build digital
            experiences that captivate audiences and drive measurable results. Our
            multidisciplinary team blends strategy, design, and technology to deliver
            work that stands at the intersection of beauty and function.
          </p>
          <div style={{
            display: 'flex',
            gap: 40,
          }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 32, fontWeight: 700, color: colors.textPrimary, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 14, fontWeight: 400, color: colors.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section style={{
        padding: '120px 60px',
        boxSizing: 'border-box',
        background: colors.bgAlt,
      }}>
        <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 60, marginTop: 0, letterSpacing: -1 }}>
          Our Team
        </h2>
        <div style={{ display: 'flex', gap: 24 }}>
          {team.map((member) => (
            <div key={member.name} style={{ width: 320, flexShrink: 0 }}>
              <div style={{
                width: 320,
                height: 400,
                borderRadius: 12,
                background: member.gradient,
                marginBottom: 20,
              }} />
              <div style={{ fontSize: 20, fontWeight: 700 }}>{member.name}</div>
              <div style={{ fontSize: 14, fontWeight: 400, color: colors.textSecondary, marginTop: 4 }}>{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Logos Row ── */}
      <section style={{
        padding: '80px 60px',
        boxSizing: 'border-box',
        background: colors.bg,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: 4,
          color: colors.textSecondary,
          marginBottom: 48,
        }}>
          Trusted By
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 64, alignItems: 'center' }}>
          {['Google', 'Apple', 'Meta', 'Nike', 'Spotify'].map((name) => (
            <div key={name} style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: colors.textPrimary,
              opacity: 0.5,
            }}>
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '80px 60px 40px',
        boxSizing: 'border-box',
        background: colors.bg,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 80 }}>
          {/* Left */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
              STUDIO
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, color: colors.textSecondary, maxWidth: 320, lineHeight: 1.6 }}>
              Award-winning creative agency crafting digital experiences that move people.
            </div>
          </div>
          {/* Right */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: colors.textSecondary, marginBottom: 8 }}>hello@studio.design</div>
            <div style={{ fontSize: 16, fontWeight: 400, color: colors.textSecondary, marginBottom: 8 }}>+1 (555) 234-5678</div>
            <div style={{ fontSize: 16, fontWeight: 400, color: colors.textSecondary }}>San Francisco, CA</div>
          </div>
        </div>
        <div style={{
          fontSize: 13,
          color: colors.textSecondary,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          opacity: 0.6,
        }}>
          &copy; 2026 Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
