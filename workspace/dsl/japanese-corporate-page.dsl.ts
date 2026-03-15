/**
 * Japanese Corporate Page — 20 sections of a professional Japanese company website.
 *
 * Demonstrates:
 *  - image() and imageFill() for hero backgrounds and thumbnails
 *  - gradient() for navy corporate headers
 *  - Nested vertical/horizontal auto-layout
 *  - FILL sizing for responsive children
 *  - text wrapping with textAutoResize: 'HEIGHT'
 *  - strokes, cornerRadius, cornerRadii
 *  - opacity overlays
 *  - defineTokens() for reusable color palette
 *  - Helper functions for repeated card/row patterns
 *  - statBlock() and badge() pattern helpers
 */
import {
  frame, text, rectangle, image, ellipse,
  solid, gradient, imageFill, hex,
  horizontal, vertical,
  defineTokens, token,
  badge, statBlock,
} from '@figma-dsl/core';

// ─── Color Tokens ──────────────────────────────────────────────────
const c = defineTokens({
  navy: '#1a237e',
  navyMid: '#0d47a1',
  navyLight: '#01579b',
  white: '#ffffff',
  offWhite: '#f9fafb',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray900: '#111827',
  blue100: '#e3f2fd',
  blue200: '#bbdefb',
  blue700: '#1565c0',
  green100: '#e8f5e9',
  green700: '#2e7d32',
  green600: '#16a34a',
  orange100: '#fff3e0',
  orange900: '#e65100',
  purple100: '#f3e5f5',
  purple700: '#7b1fa2',
});

// ─── Helpers ───────────────────────────────────────────────────────
function sectionTitle(title: string, subtitle?: string) {
  const children = [
    text(title, {
      fontSize: 28,
      fontWeight: 700,
      color: '#111827',
      textAlignHorizontal: 'CENTER',
    }),
  ];
  if (subtitle) {
    children.push(
      text(subtitle, {
        fontSize: 16,
        color: '#6b7280',
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 165, unit: 'PERCENT' },
        size: { x: 600 },
        textAutoResize: 'HEIGHT',
      })
    );
  }
  return frame('SectionTitle', {
    autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

function serviceCard(iconText: string, title: string, description: string, imgSrc?: string) {
  const children: any[] = [];
  if (imgSrc) {
    children.push(
      image(`${title} Image`, {
        src: imgSrc,
        size: { x: 350, y: 180 },
        fit: 'FILL',
        layoutSizingHorizontal: 'FILL',
      })
    );
  }
  children.push(
    frame(`${title} Body`, {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame(`${title} Icon`, {
          size: { x: 48, y: 48 },
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [
            gradient([
              { hex: '#e3f2fd', position: 0 },
              { hex: '#bbdefb', position: 1 },
            ], 135),
          ],
          cornerRadius: 6,
          children: [
            text(iconText, { fontSize: 20, color: '#1a237e' }),
          ],
        }),
        text(title, {
          fontSize: 18,
          fontWeight: 600,
          color: '#111827',
          lineHeight: { value: 130, unit: 'PERCENT' },
        }),
        text(description, {
          fontSize: 14,
          color: '#6b7280',
          lineHeight: { value: 165, unit: 'PERCENT' },
          size: { x: 300 },
          textAutoResize: 'HEIGHT',
        }),
      ],
    })
  );

  return frame(`Card ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 350, y: undefined },
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children,
  });
}

function newsRow(date: string, catLabel: string, catBg: string, catColor: string, title: string) {
  return frame(`News ${date}`, {
    autoLayout: horizontal({ spacing: 16, padY: 20, counterAlign: 'MIN' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Meta', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(date, { fontSize: 14, color: '#9ca3af' }),
          frame('Category', {
            autoLayout: horizontal({ padX: 10, padY: 2, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(catBg)],
            cornerRadius: 9999,
            children: [
              text(catLabel, { fontSize: 11, fontWeight: 600, color: catColor, letterSpacing: { value: 5, unit: 'PERCENT' } }),
            ],
          }),
        ],
      }),
      text(title, {
        fontSize: 16,
        fontWeight: 500,
        color: '#111827',
        lineHeight: { value: 150, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

function heroSection(companyLabel: string, tagline: string, subtitle: string, bgImgSrc: string) {
  return frame(`Hero ${companyLabel}`, {
    size: { x: 1440, y: 400 },
    autoLayout: vertical({ spacing: 16, align: 'CENTER', counterAlign: 'CENTER', padX: 120, padY: 80, widthSizing: 'FIXED', heightSizing: 'FIXED' }),
    fills: [
      imageFill(bgImgSrc),
      gradient([
        { hex: '#1a237e99', position: 0 },
        { hex: '#0d47a1cc', position: 0.5 },
        { hex: '#01579bdd', position: 1 },
      ], 135),
    ],
    clipContent: true,
    children: [
      text(companyLabel, {
        fontSize: 13,
        fontWeight: 600,
        color: '#ffffffb3',
        letterSpacing: { value: 20, unit: 'PERCENT' },
        textAlignHorizontal: 'CENTER',
      }),
      text(tagline, {
        fontSize: 48,
        fontWeight: 700,
        color: '#ffffff',
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 115, unit: 'PERCENT' },
        letterSpacing: { value: -2, unit: 'PERCENT' },
      }),
      text(subtitle, {
        fontSize: 18,
        color: '#ffffffd9',
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 165, unit: 'PERCENT' },
        size: { x: 600 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function statCard(value: string, label: string, change?: string) {
  const children = [
    text(value, { fontSize: 32, fontWeight: 700, color: '#1a237e' }),
    text(label, { fontSize: 14, color: '#6b7280' }),
  ];
  if (change) {
    children.push(text(change, { fontSize: 13, fontWeight: 600, color: '#16a34a' }));
  }
  return frame(`Stat ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 24, padY: 32, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

function contactRow(label: string, value: string) {
  return frame(`Contact ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, {
        fontSize: 13,
        fontWeight: 600,
        color: '#1a237e',
        letterSpacing: { value: 5, unit: 'PERCENT' },
      }),
      text(value, {
        fontSize: 15,
        color: '#374151',
        lineHeight: { value: 150, unit: 'PERCENT' },
        size: { x: 400 },
        textAutoResize: 'HEIGHT',
      }),
    ],
  });
}

function footerColumn(title: string, links: string[]) {
  return frame(`Footer ${title}`, {
    autoLayout: vertical({ spacing: 10 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(title, {
        fontSize: 14,
        fontWeight: 600,
        color: '#ffffffe6',
        letterSpacing: { value: 5, unit: 'PERCENT' },
      }),
      ...links.map(link =>
        text(link, { fontSize: 14, color: '#ffffff99' })
      ),
    ],
  });
}

function partnerLogo(name: string) {
  return frame(`Partner ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 16, padY: 24, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame(`${name} Icon`, {
        size: { x: 48, y: 48 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#e3f2fd')],
        cornerRadius: 8,
        children: [
          text(name[0], { fontSize: 18, fontWeight: 700, color: '#1a237e' }),
        ],
      }),
      text(name, { fontSize: 13, fontWeight: 500, color: '#374151', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

// ─── Page Sections ─────────────────────────────────────────────────

// Page 1: Main Hero
const page01 = heroSection(
  'YAMATO HOLDINGS',
  'Innovation for a Sustainable Future',
  'Pioneering technology solutions that drive Japan\'s digital transformation since 1985.',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1440&h=400&fit=crop'
);

// Page 2: Services Grid
const page02 = frame('Services', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    sectionTitle('Our Services', 'Comprehensive solutions tailored for enterprise clients across Japan and Asia-Pacific.'),
    frame('Services Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('B', 'Enterprise Consulting', 'Strategic consulting for digital transformation initiatives, helping Fortune 500 companies navigate Japan\'s business landscape.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=180&fit=crop'),
        serviceCard('S', 'System Integration', 'End-to-end system integration services, connecting legacy infrastructure with modern cloud-native architectures.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=180&fit=crop'),
        serviceCard('C', 'Cybersecurity', 'Advanced threat detection and compliance frameworks meeting Japan\'s stringent data protection regulations.', 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=180&fit=crop'),
      ],
    }),
  ],
});

// Page 3: Company Profile
const page03 = frame('Company Profile', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    frame('Profile Text', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Company Overview', { fontSize: 30, fontWeight: 700, color: '#111827', lineHeight: { value: 130, unit: 'PERCENT' } }),
        text('Established in 1985, Yamato Holdings has grown to become one of Japan\'s leading technology companies. With offices across Tokyo, Osaka, and Singapore, we serve over 2,000 enterprise clients with cutting-edge digital solutions.', {
          fontSize: 16,
          color: '#6b7280',
          lineHeight: { value: 165, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Stats Grid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Stats Col 1', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('3,500+', 'Employees Worldwide', { valueColor: '#1a237e' }),
                statBlock('2,000+', 'Enterprise Clients', { valueColor: '#1a237e' }),
              ],
            }),
            frame('Stats Col 2', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('¥120B', 'Annual Revenue', { valueColor: '#1a237e' }),
                statBlock('38', 'Years of Excellence', { valueColor: '#1a237e' }),
              ],
            }),
          ],
        }),
      ],
    }),
    image('Office Photo', {
      src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop',
      size: { x: 480, y: 400 },
      cornerRadius: 16,
      fit: 'FILL',
    }),
  ],
});

// Page 4: News
const page04 = frame('News Section', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120, padY: 80 }),
  fills: [solid('#ffffff')],
  children: [
    text('News & Updates', { fontSize: 28, fontWeight: 700, color: '#111827' }),
    frame('Spacer04', { size: { x: 1, y: 32 }, fills: [] }),
    newsRow('2026-03-12', 'PRESS', '#e3f2fd', '#1565c0', 'Yamato Holdings announces strategic partnership with NTT Data for next-generation cloud services'),
    newsRow('2026-03-08', 'IR', '#e8f5e9', '#2e7d32', 'Q3 FY2025 Financial Results: Revenue up 12% YoY driven by strong enterprise demand'),
    newsRow('2026-02-28', 'PRODUCT', '#fff3e0', '#e65100', 'Launch of YamatoAI Platform: AI-powered business intelligence for Japanese enterprises'),
    newsRow('2026-02-15', 'EVENT', '#f3e5f5', '#7b1fa2', 'Yamato Holdings to exhibit at CEATEC Japan 2026 — Booth A-201, Makuhari Messe'),
  ],
});

// Page 5: Technology Hero
const page05 = heroSection(
  'TECHNOLOGY',
  'Next-Generation Digital Infrastructure',
  'Building the backbone of Japan\'s digital economy with AI, cloud, and IoT solutions.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=400&fit=crop'
);

// Page 6: Industry Solutions
const page06 = frame('Solutions', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    sectionTitle('Industry Solutions'),
    frame('Solutions Grid', {
      autoLayout: horizontal({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('F', 'Finance & Banking', 'Regulatory-compliant fintech solutions for Japan\'s banking sector.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=180&fit=crop'),
        serviceCard('M', 'Manufacturing', 'Smart factory and supply chain optimization powered by IoT.', 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=180&fit=crop'),
        serviceCard('H', 'Healthcare', 'Electronic medical records and telemedicine platforms.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=180&fit=crop'),
        serviceCard('T', 'Transportation', 'Intelligent transportation and logistics management systems.', 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=180&fit=crop'),
      ],
    }),
  ],
});

// Page 7: Corporate Message
const page07 = frame('Message', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 24, padX: 320, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    text('MESSAGE FROM THE PRESIDENT', {
      fontSize: 13,
      fontWeight: 600,
      color: '#1a237e',
      letterSpacing: { value: 10, unit: 'PERCENT' },
      textAlignHorizontal: 'CENTER',
    }),
    text('"Technology should serve society, not the other way around."', {
      fontSize: 30,
      fontWeight: 700,
      color: '#111827',
      textAlignHorizontal: 'CENTER',
      lineHeight: { value: 130, unit: 'PERCENT' },
      size: { x: 800 },
      textAutoResize: 'HEIGHT',
    }),
    text('At Yamato Holdings, we believe that true innovation must be rooted in understanding people and their needs. Our mission is to create technology that empowers businesses and communities across Japan, bridging tradition with the future.', {
      fontSize: 16,
      color: '#6b7280',
      textAlignHorizontal: 'CENTER',
      lineHeight: { value: 165, unit: 'PERCENT' },
      size: { x: 600 },
      textAutoResize: 'HEIGHT',
    }),
    frame('CEO Info', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        ellipse('CEO Avatar', {
          size: { x: 64, y: 64 },
          fills: [solid('#e3f2fd')],
        }),
        frame('CEO Text', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('Takeshi Yamamoto', { fontSize: 16, fontWeight: 600, color: '#111827' }),
            text('President & CEO', { fontSize: 14, color: '#6b7280' }),
          ],
        }),
      ],
    }),
  ],
});

// Page 8: Sustainability Hero
const page08 = heroSection(
  'SUSTAINABILITY',
  'Creating Value for Future Generations',
  'Our ESG commitment: carbon neutral by 2035, 50% renewable energy by 2028.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1440&h=400&fit=crop'
);

// Page 9: ESG Initiatives
const page09 = frame('ESG', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    sectionTitle('ESG Initiatives'),
    frame('ESG Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('E', 'Environment', 'Reducing carbon emissions 40% by 2028. Transitioning all data centers to renewable energy sources.', 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=400&h=180&fit=crop'),
        serviceCard('S', 'Social', 'Community development programs and STEM education initiatives reaching 50,000 students annually.', 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=180&fit=crop'),
        serviceCard('G', 'Governance', 'Transparent corporate governance with independent board oversight and comprehensive compliance framework.', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=180&fit=crop'),
      ],
    }),
  ],
});

// Page 10: Global Offices
const page10 = frame('Global Presence', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    frame('Global Text', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Global Presence', { fontSize: 30, fontWeight: 700, color: '#111827', lineHeight: { value: 130, unit: 'PERCENT' } }),
        text('With headquarters in Marunouchi, Tokyo and regional offices across Asia-Pacific, Yamato Holdings delivers localized expertise with global capabilities. Our multicultural team of 3,500+ professionals serves clients in 12 countries.', {
          fontSize: 16,
          color: '#6b7280',
          lineHeight: { value: 165, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('Global Stats', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('GS Col 1', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('12', 'Countries', { valueColor: '#1a237e' }),
                statBlock('24/7', 'Support Coverage', { valueColor: '#1a237e' }),
              ],
            }),
            frame('GS Col 2', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('18', 'Office Locations', { valueColor: '#1a237e' }),
                statBlock('15+', 'Languages Supported', { valueColor: '#1a237e' }),
              ],
            }),
          ],
        }),
      ],
    }),
    image('Global Photo', {
      src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=400&fit=crop',
      size: { x: 480, y: 400 },
      cornerRadius: 16,
      fit: 'FILL',
    }),
  ],
});

// Page 11: IR Hero
const page11 = heroSection(
  'INVESTOR RELATIONS',
  'Transparent Growth, Steady Returns',
  'TSE Prime Market Listed | Ticker: 9999 | Credit Rating: AA (R&I)',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1440&h=400&fit=crop'
);

// Page 12: Financial Highlights
const page12 = frame('Financials', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    sectionTitle('Financial Highlights — FY2025'),
    frame('Financials Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        statCard('¥120.5B', 'Revenue', '+12.3%'),
        statCard('¥18.2B', 'Operating Profit', '+8.7%'),
        statCard('¥12.8B', 'Net Income', '+15.1%'),
        statCard('¥85', 'EPS', '+14.9%'),
      ],
    }),
  ],
});

// Page 13: IR News
const page13 = frame('IR News', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0, padX: 120, padY: 80 }),
  fills: [solid('#ffffff')],
  children: [
    text('IR Calendar & Announcements', { fontSize: 28, fontWeight: 700, color: '#111827' }),
    frame('Spacer13', { size: { x: 1, y: 32 }, fills: [] }),
    newsRow('2026-05-15', 'IR', '#e8f5e9', '#2e7d32', 'FY2025 Annual General Meeting of Shareholders — Grand Hyatt Tokyo'),
    newsRow('2026-04-28', 'IR', '#e8f5e9', '#2e7d32', 'FY2025 Full Year Financial Results Announcement'),
    newsRow('2026-03-01', 'PRESS', '#e3f2fd', '#1565c0', 'Yamato Holdings selected for MSCI Japan ESG Select Leaders Index'),
  ],
});

// Page 14: Careers Hero
const page14 = heroSection(
  'CAREERS',
  'Build Your Future With Us',
  'Join 3,500+ professionals shaping Japan\'s digital future. New graduate and mid-career positions available.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1440&h=400&fit=crop'
);

// Page 15: Career Benefits
const page15 = frame('Benefits', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#ffffff')],
  children: [
    sectionTitle('Why Work at Yamato'),
    frame('Benefits Grid', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        serviceCard('L', 'Learning & Development', 'Annual ¥500K education budget, internal tech conferences, and global exchange programs.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=180&fit=crop'),
        serviceCard('W', 'Work-Life Balance', 'Flexible hours, remote work options, 20+ days PTO, and comprehensive parental leave.', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=180&fit=crop'),
        serviceCard('P', 'Competitive Package', 'Industry-leading compensation, stock options, pension plan, and annual performance bonuses.', 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=180&fit=crop'),
      ],
    }),
  ],
});

// Page 16: R&D
const page16 = frame('R&D Section', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    frame('RnD Text', {
      autoLayout: vertical({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Research & Development', { fontSize: 30, fontWeight: 700, color: '#111827', lineHeight: { value: 130, unit: 'PERCENT' } }),
        text('Our R&D division, Yamato Labs, operates three research centers focusing on AI/ML, quantum computing, and edge computing. We invest 15% of revenue in R&D, filing 200+ patents annually.', {
          fontSize: 16,
          color: '#6b7280',
          lineHeight: { value: 165, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('RnD Stats', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('RS Col 1', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('¥18B', 'Annual R&D Investment', { valueColor: '#1a237e' }),
                statBlock('450', 'Researchers', { valueColor: '#1a237e' }),
              ],
            }),
            frame('RS Col 2', {
              autoLayout: vertical({ spacing: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                statBlock('200+', 'Patents Filed Annually', { valueColor: '#1a237e' }),
                statBlock('3', 'Research Centers', { valueColor: '#1a237e' }),
              ],
            }),
          ],
        }),
      ],
    }),
    image('Lab Photo', {
      src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
      size: { x: 480, y: 400 },
      cornerRadius: 16,
      fit: 'FILL',
    }),
  ],
});

// Page 17: Partnerships Hero
const page17 = heroSection(
  'PARTNERSHIPS',
  'Stronger Together',
  'Strategic alliances with global technology leaders and local innovators.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=400&fit=crop'
);

// Page 18: Partners Grid
const page18 = frame('Partners', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 48, padX: 120, padY: 80, counterAlign: 'CENTER' }),
  fills: [solid('#f9fafb')],
  children: [
    sectionTitle('Trusted Partners & Certifications', 'Certified partner of leading global technology providers.'),
    frame('Partners Grid', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        partnerLogo('Microsoft Gold Partner'),
        partnerLogo('AWS Premier'),
        partnerLogo('Google Cloud'),
        partnerLogo('SAP Platinum'),
        partnerLogo('Salesforce'),
      ],
    }),
  ],
});

// Page 19: Contact
const page19 = frame('Contact', {
  size: { x: 1440, y: undefined },
  autoLayout: horizontal({ spacing: 64, padX: 120, padY: 80 }),
  fills: [solid('#ffffff')],
  children: [
    frame('Contact Info', {
      autoLayout: vertical({ spacing: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Contact Us', { fontSize: 28, fontWeight: 700, color: '#111827' }),
        frame('ContactSpacer', { size: { x: 1, y: 4 }, fills: [] }),
        contactRow('HEAD OFFICE', 'Marunouchi Park Building, 2-6-1 Marunouchi, Chiyoda-ku, Tokyo 100-6921'),
        contactRow('PHONE', '+81-3-XXXX-XXXX'),
        contactRow('EMAIL', 'info@yamato-holdings.example.co.jp'),
        contactRow('BUSINESS HOURS', 'Mon-Fri 9:00-18:00 JST'),
      ],
    }),
    image('Tokyo Photo', {
      src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop',
      size: { x: 520, y: 320 },
      cornerRadius: 16,
      fit: 'FILL',
    }),
  ],
});

// Page 20: Footer
const page20 = frame('Footer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 40, padX: 120, padY: 48 }),
  fills: [solid('#1a237e')],
  children: [
    frame('Footer Columns', {
      autoLayout: horizontal({ spacing: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        footerColumn('COMPANY', ['About Us', 'Leadership', 'History', 'CSR']),
        footerColumn('SERVICES', ['Consulting', 'System Integration', 'Cloud Services', 'Cybersecurity']),
        footerColumn('INVESTOR RELATIONS', ['Financial Data', 'Stock Information', 'IR Calendar', 'Corporate Governance']),
        footerColumn('CAREERS', ['Job Openings', 'New Graduates', 'Culture', 'Benefits']),
      ],
    }),
    rectangle('Footer Divider', {
      size: { x: 1, y: 1 },
      fills: [solid('#ffffff', 0.15)],
      layoutSizingHorizontal: 'FILL',
    }),
    frame('Footer Bottom', {
      autoLayout: horizontal({ spacing: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('© 2026 Yamato Holdings, Inc. All rights reserved.', {
          fontSize: 13,
          color: '#ffffff80',
        }),
        frame('Footer Links', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Privacy Policy', { fontSize: 13, color: '#ffffff80' }),
            text('Terms of Use', { fontSize: 13, color: '#ffffff80' }),
            text('Sitemap', { fontSize: 13, color: '#ffffff80' }),
          ],
        }),
      ],
    }),
  ],
});

// ─── Root: All 20 Sections ─────────────────────────────────────────
export default frame('Japanese Corporate Page', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    page01, page02, page03, page04, page05,
    page06, page07, page08, page09, page10,
    page11, page12, page13, page14, page15,
    page16, page17, page18, page19, page20,
  ],
});
