import {
  frame, text, rectangle, image,
  solid, gradient, imageFill,
  horizontal, vertical,
  defineTokens,
} from '@figma-dsl/core';

// ── Tokens ──

const colors = defineTokens({
  bg: '#0a0a0a',
  bgAlt: '#111111',
  textPrimary: '#f5f5f7',
  textSecondary: '#86868b',
  accent: '#e63946',
});

// ── Helpers ──

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 400, color: '#86868b' });
}

function projectCard(
  title: string,
  category: string,
  imgSrc: string,
) {
  return frame(`Project: ${title}`, {
    size: { x: 680, y: 500 },
    autoLayout: vertical({ spacing: 0, align: 'MAX' }),
    clipContent: true,
    cornerRadius: 16,
    children: [
      image(`Img: ${title}`, {
        src: imgSrc,
        size: { x: 680, y: 500 },
      }),
      frame(`Overlay: ${title}`, {
        size: { x: 680, y: 160 },
        autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, align: 'MAX' }),
        fills: [
          gradient([
            { hex: '#00000000', position: 0 },
            { hex: '#000000cc', position: 1 },
          ], 270),
        ],
        children: [
          text(title, { fontSize: 24, fontWeight: 700, color: '#f5f5f7' }),
          text(category, { fontSize: 14, fontWeight: 400, color: '#86868b' }),
        ],
      }),
    ],
  });
}

function teamCard(
  name: string,
  role: string,
  imgSrc: string,
) {
  return frame(`Team: ${name}`, {
    size: { x: 320, y: undefined },
    autoLayout: vertical({ spacing: 16 }),
    children: [
      image(`Photo: ${name}`, {
        src: imgSrc,
        size: { x: 320, y: 400 },
        cornerRadius: 12,
      }),
      text(name, { fontSize: 20, fontWeight: 700, color: '#f5f5f7' }),
      text(role, { fontSize: 14, fontWeight: 400, color: '#86868b' }),
    ],
  });
}

function statBlock(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    size: { x: 240, y: undefined },
    autoLayout: vertical({ spacing: 8 }),
    children: [
      text(value, { fontSize: 40, fontWeight: 700, color: '#e63946' }),
      text(label, { fontSize: 14, fontWeight: 400, color: '#86868b' }),
    ],
  });
}

// ── Page ──

export default frame('AwwwardsAgency', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [

    // ── 1. Navbar ──
    frame('Navbar', {
      size: { x: 1440, y: 80 },
      autoLayout: horizontal({
        spacing: 0,
        padX: 60,
        padY: 0,
        align: 'SPACE_BETWEEN',
        counterAlign: 'CENTER',
      }),
      fills: [solid('#0a0a0a')],
      children: [
        text('STUDIO', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 40, counterAlign: 'CENTER' }),
          children: [
            navLink('Work'),
            navLink('About'),
            navLink('Team'),
            navLink('Contact'),
          ],
        }),
      ],
    }),

    // ── 2. Hero ──
    frame('Hero', {
      size: { x: 1440, y: 800 },
      fills: [
        imageFill('../assets/awwwards/hero-agency.png'),
        gradient([
          { hex: '#0a0a0a00', position: 0 },
          { hex: '#0a0a0aee', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({
        spacing: 20,
        padX: 120,
        padY: 80,
        align: 'MAX',
        counterAlign: 'MIN',
      }),
      clipContent: true,
      children: [
        text('We Create', {
          fontSize: 80,
          fontWeight: 400,
          color: '#ffffff',
        }),
        text('Digital Experiences', {
          fontSize: 96,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: { value: -2, unit: 'PIXELS' },
        }),
        text('Award-winning digital agency crafting bold, immersive brands and products for forward-thinking companies.', {
          fontSize: 18,
          fontWeight: 400,
          color: '#86868b',
          size: { x: 600 },
          textAutoResize: 'HEIGHT',
          lineHeight: { value: 160, unit: 'PERCENT' },
        }),
      ],
    }),

    // ── 3. Selected Work ──
    frame('SelectedWork', {
      autoLayout: vertical({ spacing: 48, padX: 120, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('Selected Work', {
          fontSize: 48,
          fontWeight: 700,
          color: '#f5f5f7',
        }),
        // Row 1
        frame('ProjectRow1', {
          autoLayout: horizontal({ spacing: 40 }),
          children: [
            projectCard('Nike Rebrand', 'Branding', '../assets/awwwards/project-1.png'),
            projectCard('Spotify Redesign', 'Web Design', '../assets/awwwards/project-2.png'),
          ],
        }),
        // Row 2
        frame('ProjectRow2', {
          autoLayout: horizontal({ spacing: 40 }),
          children: [
            projectCard('Fintech Mobile', 'App Design', '../assets/awwwards/project-3.png'),
            projectCard('Nike Campaign', 'Motion', '../assets/awwwards/project-4.png'),
          ],
        }),
      ],
    }),

    // ── 4. Editorial Strip ──
    frame('EditorialStrip', {
      size: { x: 1440, y: 600 },
      fills: [
        imageFill('../assets/awwwards/editorial-1.png'),
        gradient([
          { hex: '#0a0a0a99', position: 0 },
          { hex: '#0a0a0a99', position: 1 },
        ], 270),
      ],
      autoLayout: vertical({
        spacing: 0,
        padX: 120,
        padY: 0,
        align: 'CENTER',
        counterAlign: 'CENTER',
      }),
      children: [
        text('Crafting stories through pixels', {
          fontSize: 56,
          fontWeight: 700,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // ── 5. About Section ──
    frame('About', {
      autoLayout: horizontal({ spacing: 80, padX: 120, padY: 96, counterAlign: 'MIN' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        // Left: Quote
        frame('AboutLeft', {
          size: { x: 560, y: undefined },
          autoLayout: vertical({ spacing: 0 }),
          children: [
            text('We believe in the power of design to transform brands', {
              fontSize: 48,
              fontWeight: 400,
              color: '#ffffff',
              size: { x: 560 },
              textAutoResize: 'HEIGHT',
              lineHeight: { value: 130, unit: 'PERCENT' },
            }),
          ],
        }),
        // Right: Description + Stats
        frame('AboutRight', {
          size: { x: 520, y: undefined },
          autoLayout: vertical({ spacing: 48 }),
          children: [
            text(
              'Our multidisciplinary team combines strategy, design, and technology to deliver projects that make a lasting impact. We partner with ambitious brands to push creative boundaries and redefine digital experiences.',
              {
                fontSize: 16,
                fontWeight: 400,
                color: '#86868b',
                size: { x: 520 },
                textAutoResize: 'HEIGHT',
                lineHeight: { value: 180, unit: 'PERCENT' },
              },
            ),
            // Stats 2×2
            frame('StatsGrid', {
              autoLayout: vertical({ spacing: 32 }),
              children: [
                frame('StatsRow1', {
                  autoLayout: horizontal({ spacing: 40 }),
                  children: [
                    statBlock('150+', 'Projects'),
                    statBlock('12', 'Years'),
                  ],
                }),
                frame('StatsRow2', {
                  autoLayout: horizontal({ spacing: 40 }),
                  children: [
                    statBlock('40+', 'Awards'),
                    statBlock('25', 'Team Members'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── 6. Team Section ──
    frame('Team', {
      autoLayout: vertical({ spacing: 48, padX: 60, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('Our Team', { fontSize: 48, fontWeight: 700, color: '#f5f5f7' }),
        frame('TeamRow', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            teamCard('Sarah Chen', 'Creative Director', '../assets/awwwards/team-1.png'),
            teamCard('Marcus Webb', 'Lead Designer', '../assets/awwwards/team-2.png'),
            teamCard('Yuki Tanaka', 'Developer', '../assets/awwwards/team-3.png'),
            teamCard('Ana Costa', 'Strategist', '../assets/awwwards/team-4.png'),
          ],
        }),
      ],
    }),

    // ── 7. Client Logos ──
    frame('Clients', {
      autoLayout: vertical({ spacing: 32, padX: 120, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('TRUSTED BY', {
          fontSize: 14,
          fontWeight: 500,
          color: '#86868b',
          letterSpacing: { value: 300, unit: 'PERCENT' },
          textAlignHorizontal: 'CENTER',
        }),
        frame('LogoRow', {
          autoLayout: horizontal({ spacing: 64, counterAlign: 'CENTER' }),
          children: [
            image('Client1', { src: '../assets/awwwards/client-1.png', size: { x: 120, y: 60 }, opacity: 0.5 }),
            image('Client2', { src: '../assets/awwwards/client-2.png', size: { x: 120, y: 60 }, opacity: 0.5 }),
            image('Client3', { src: '../assets/awwwards/client-3.png', size: { x: 120, y: 60 }, opacity: 0.5 }),
            image('Client4', { src: '../assets/awwwards/client-4.png', size: { x: 120, y: 60 }, opacity: 0.5 }),
            image('Client5', { src: '../assets/awwwards/client-5.png', size: { x: 120, y: 60 }, opacity: 0.5 }),
          ],
        }),
      ],
    }),

    // ── 8. Footer ──
    frame('Footer', {
      autoLayout: vertical({ spacing: 40, padX: 120, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        frame('FooterMain', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Left
            frame('FooterLeft', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('STUDIO', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
                text('Creating digital experiences\nthat inspire and engage.', {
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#86868b',
                  size: { x: 280 },
                  textAutoResize: 'HEIGHT',
                  lineHeight: { value: 160, unit: 'PERCENT' },
                }),
              ],
            }),
            // Right
            frame('FooterRight', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('hello@studio.com', { fontSize: 14, fontWeight: 400, color: '#f5f5f7' }),
                text('+1 (555) 123-4567', { fontSize: 14, fontWeight: 400, color: '#86868b' }),
                text('New York, NY', { fontSize: 14, fontWeight: 400, color: '#86868b' }),
              ],
            }),
          ],
        }),
        rectangle('FooterDivider', {
          size: { x: 1, y: 1 },
          fills: [solid('#ffffff', 0.1)],
          layoutSizingHorizontal: 'FILL',
        }),
        text('© 2026 STUDIO. All rights reserved.', {
          fontSize: 12,
          fontWeight: 400,
          color: '#86868b',
        }),
      ],
    }),
  ],
});
