/**
 * Note Taking — Notion-style document editor with sidebar, breadcrumbs, and content blocks
 * DSL features: textDecoration for links, textAutoResize HEIGHT for paragraphs,
 * lineHeight for readable body text, cornerRadius on blocks, FILL layout, opacity
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function sidebarItem(label: string, indent: number, active: boolean, hasChildren: boolean) {
  return frame(`Nav: ${label}`, {
    autoLayout: horizontal({ spacing: 6, padX: 12 + indent * 16, padY: 7, counterAlign: 'CENTER' }),
    fills: [solid(active ? '#f3f4f6' : '#ffffff00')],
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 4,
    children: [
      ...(hasChildren ? [text('>', { fontSize: 10, fontWeight: 400, color: '#9ca3af' })] : []),
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#111827' : '#6b7280' }),
    ],
  });
}

function breadcrumb(items: string[]) {
  const children: ReturnType<typeof text>[] = [];
  items.forEach((item, i) => {
    if (i > 0) children.push(text('/', { fontSize: 12, fontWeight: 400, color: '#d1d5db' }));
    const isLast = i === items.length - 1;
    children.push(text(item, {
      fontSize: 12,
      fontWeight: isLast ? 500 : 400,
      color: isLast ? '#374151' : '#9ca3af',
      textDecoration: isLast ? 'NONE' : 'UNDERLINE',
    }));
  });
  return frame('Breadcrumbs', {
    autoLayout: horizontal({ spacing: 6, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children,
  });
}

function contentBlock(type: 'heading' | 'paragraph' | 'callout' | 'code' | 'checklist', content: string) {
  if (type === 'heading') {
    return text(content, { fontSize: 22, fontWeight: 700, color: '#111827', lineHeight: { value: 130, unit: 'PERCENT' } });
  }
  if (type === 'paragraph') {
    return text(content, {
      fontSize: 15, fontWeight: 400, color: '#374151',
      size: { x: 680 }, textAutoResize: 'HEIGHT',
      lineHeight: { value: 170, unit: 'PERCENT' },
    });
  }
  if (type === 'callout') {
    return frame('Callout', {
      autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14 }),
      fills: [solid('#fffbeb')],
      cornerRadius: 8,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.95, g: 0.88, b: 0.6, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('!', { fontSize: 18, fontWeight: 700, color: '#f59e0b' }),
        text(content, {
          fontSize: 14, fontWeight: 400, color: '#92400e',
          size: { x: 600 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 160, unit: 'PERCENT' },
        }),
      ],
    });
  }
  if (type === 'code') {
    return frame('CodeBlock', {
      autoLayout: vertical({ spacing: 0, padX: 16, padY: 14 }),
      fills: [solid('#1e1e2e')],
      cornerRadius: 8,
      layoutSizingHorizontal: 'FILL',
      children: [
        text(content, {
          fontSize: 13, fontWeight: 400, color: '#a6e3a1',
          size: { x: 650 }, textAutoResize: 'HEIGHT',
          lineHeight: { value: 160, unit: 'PERCENT' },
        }),
      ],
    });
  }
  // checklist
  return frame('Checklist', {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: content.split('\n').map((item, i) => {
      const done = i < 2;
      return frame(`Check:${i}`, {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('Checkbox', {
            size: { x: 18, y: 18 },
            fills: [solid(done ? '#7c3aed' : '#ffffff')],
            cornerRadius: 4,
            strokes: done ? [] : [{ color: { r: 0.8, g: 0.8, b: 0.8, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
            children: done ? [text('v', { fontSize: 11, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })] : [],
          }),
          text(item, {
            fontSize: 14, fontWeight: 400, color: done ? '#9ca3af' : '#374151',
            textDecoration: done ? 'STRIKETHROUGH' : 'NONE',
          }),
        ],
      });
    }),
  });
}

export default frame('NoteTakingPage', {
  size: { x: 1100 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Sidebar
    frame('Sidebar', {
      size: { x: 240 },
      autoLayout: vertical({ spacing: 2, padX: 8, padY: 12 }),
      fills: [solid('#fafafa')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('WorkspaceName', {
          autoLayout: horizontal({ spacing: 8, padX: 12, padY: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('WsIcon', {
              size: { x: 24, y: 24 },
              fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 135)],
              cornerRadius: 6,
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              children: [text('N', { fontSize: 13, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
            }),
            text('My Workspace', { fontSize: 14, fontWeight: 600, color: '#111827' }),
          ],
        }),
        rectangle('SidebarDiv', { size: { x: 220, y: 1 }, fills: [solid('#e5e7eb')] }),
        text('PAGES', { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
        sidebarItem('Getting Started', 0, false, true),
        sidebarItem('Product Roadmap', 0, true, true),
        sidebarItem('Q1 Goals', 1, false, false),
        sidebarItem('Q2 Planning', 1, false, false),
        sidebarItem('Design System', 0, false, true),
        sidebarItem('Components', 1, false, false),
        sidebarItem('Tokens', 1, false, false),
        sidebarItem('Meeting Notes', 0, false, false),
        sidebarItem('Research', 0, false, false),
        rectangle('SidebarDiv2', { size: { x: 220, y: 1 }, fills: [solid('#e5e7eb')] }),
        text('PRIVATE', { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: { value: 8, unit: 'PERCENT' } }),
        sidebarItem('Journal', 0, false, false),
        sidebarItem('Ideas', 0, false, false),
      ],
    }),
    // Document area
    frame('DocumentArea', {
      autoLayout: vertical({ spacing: 0, padX: 48, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        breadcrumb(['My Workspace', 'Product Roadmap']),
        frame('DocContent', {
          autoLayout: vertical({ spacing: 20, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Product Roadmap 2026', { fontSize: 36, fontWeight: 800, color: '#111827', lineHeight: { value: 115, unit: 'PERCENT' } }),
            text('Last edited by Sarah Chen on Mar 14, 2026', { fontSize: 12, fontWeight: 400, color: '#9ca3af', opacity: 0.8 }),
            contentBlock('paragraph', 'This document outlines our product roadmap for 2026. Our focus areas include improving the core user experience, expanding integrations, and building out the analytics platform.'),
            contentBlock('callout', 'Important: All dates are tentative and subject to change based on resource allocation and customer feedback.'),
            contentBlock('heading', 'Q1 Objectives'),
            contentBlock('checklist', 'Launch component library v2\nShip analytics dashboard\nComplete API documentation\nStart mobile app prototype'),
            contentBlock('heading', 'Technical Architecture'),
            contentBlock('paragraph', 'We are migrating to a microservices architecture using the following stack. The migration is planned in three phases to minimize disruption to the existing user base.'),
            contentBlock('code', 'const config = {\n  runtime: "edge",\n  database: "postgresql",\n  cache: "redis",\n  queue: "rabbitmq"\n};'),
          ],
        }),
      ],
    }),
  ],
});
