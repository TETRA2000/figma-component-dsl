/**
 * Portfolio Showcase — Designer portfolio with hero, project grid, skills
 *
 * DSL features stressed: wide cards, gradient overlays, large typography (48px+),
 * SPACE_BETWEEN nav links, full-width sections, minimal spacing
 */
import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function navLink(label: string) {
  return text(label, { fontSize: 14, fontWeight: 500, color: '#999999' });
}

function skillTag(label: string) {
  return frame(`Skill: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 6, align: 'CENTER' }),
    fills: [solid('#2a2a2a')],
    cornerRadius: 6,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#cccccc' }),
    ],
  });
}

function projectCard(title: string, desc: string, gradientStart: string, gradientEnd: string) {
  return frame(`Project: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#222222')],
    cornerRadius: 12,
    clipContent: true,
    layoutSizingHorizontal: 'FILL',
    children: [
      // Gradient overlay area
      frame('ProjectCover', {
        size: { x: 1, y: 200 },
        fills: [gradient([
          { hex: gradientStart, position: 0 },
          { hex: gradientEnd, position: 1 },
        ], 135)],
        layoutSizingHorizontal: 'FILL',
      }),
      // Content
      frame('ProjectContent', {
        autoLayout: vertical({ spacing: 8, padX: 24, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 18, fontWeight: 700, color: '#f5f5f5' }),
          text(desc, {
            fontSize: 14, fontWeight: 400, color: '#888888',
            lineHeight: { value: 150, unit: 'PERCENT' },
            size: { x: 340 },
            textAutoResize: 'HEIGHT',
          }),
        ],
      }),
    ],
  });
}

export default frame('PortfolioPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#1a1a1a')],
  children: [
    // Nav
    frame('Nav', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('JD', { fontSize: 20, fontWeight: 700, color: '#f5f5f5' }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            navLink('Work'),
            navLink('About'),
            navLink('Skills'),
            navLink('Contact'),
          ],
        }),
      ],
    }),

    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Accent line
        rectangle('AccentLine', {
          size: { x: 60, y: 4 },
          fills: [gradient([
            { hex: '#ff6b6b', position: 0 },
            { hex: '#feca57', position: 1 },
          ], 0)],
          cornerRadius: 2,
        }),
        text('John\nDesigner', {
          fontSize: 72, fontWeight: 700, color: '#f5f5f5',
          lineHeight: { value: 100, unit: 'PERCENT' },
          letterSpacing: { value: -3, unit: 'PERCENT' },
        }),
        text('I craft digital experiences that connect people with products they love.', {
          fontSize: 20, fontWeight: 400, color: '#888888',
          lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 560 },
          textAutoResize: 'HEIGHT',
        }),
        frame('HeroCTA', {
          autoLayout: horizontal({ spacing: 0, padX: 28, padY: 14, align: 'CENTER' }),
          fills: [gradient([
            { hex: '#ff6b6b', position: 0 },
            { hex: '#feca57', position: 1 },
          ], 0)],
          cornerRadius: 10,
          children: [
            text('View Work', { fontSize: 15, fontWeight: 600, color: '#1a1a1a' }),
          ],
        }),
      ],
    }),

    // Projects
    frame('ProjectsSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Selected Work', { fontSize: 28, fontWeight: 700, color: '#f5f5f5' }),
        frame('ProjectGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            projectCard('Fintech Dashboard', 'A comprehensive financial analytics platform with real-time data visualization.', '#667eea', '#764ba2'),
            projectCard('E-Commerce Redesign', 'Complete overhaul of a fashion marketplace serving 2M+ users.', '#ff6b6b', '#feca57'),
            projectCard('Health App', 'Mobile-first health tracking with AI-powered insights and recommendations.', '#11998e', '#38ef7d'),
          ],
        }),
      ],
    }),

    // Skills
    frame('SkillsSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Skills & Tools', { fontSize: 20, fontWeight: 700, color: '#f5f5f5' }),
        frame('SkillTags', {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            skillTag('Figma'),
            skillTag('React'),
            skillTag('TypeScript'),
            skillTag('Design Systems'),
            skillTag('Prototyping'),
            skillTag('User Research'),
          ],
        }),
      ],
    }),

    // Contact
    frame('ContactSection', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 64, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text("Let's Work Together", {
          fontSize: 32, fontWeight: 700, color: '#f5f5f5',
          textAlignHorizontal: 'CENTER',
        }),
        text('Available for freelance projects and full-time opportunities.', {
          fontSize: 16, fontWeight: 400, color: '#888888',
          textAlignHorizontal: 'CENTER',
        }),
        frame('ContactCTA', {
          autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, align: 'CENTER' }),
          fills: [gradient([
            { hex: '#ff6b6b', position: 0 },
            { hex: '#feca57', position: 1 },
          ], 0)],
          cornerRadius: 12,
          children: [
            text('Get in Touch', { fontSize: 16, fontWeight: 600, color: '#1a1a1a' }),
          ],
        }),
      ],
    }),
  ],
});
