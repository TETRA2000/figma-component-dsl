/**
 * Real Estate Detail — Single property page with hero image, features grid, agent contact, map placeholder
 * DSL features stressed: large hero rectangle with gradient, feature grid with icons, two-column layout,
 * contact card with ellipse avatar, map placeholder, price highlight, pill amenity tags
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function featureItem(icon: string, value: string, label: string) {
  return frame(`Feature: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 20, fontWeight: 400, color: '#2563eb', textAlignHorizontal: 'CENTER' }),
      text(value, { fontSize: 18, fontWeight: 700, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#64748b', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function amenityTag(label: string) {
  return frame(`Amenity: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 6 }),
    fills: [solid('#eff6ff')],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#2563eb' }),
    ],
  });
}

function agentCard(name: string, title: string, phone: string, email: string) {
  return frame('AgentCard', {
    autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AgentProfile', {
        autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          ellipse('AgentAvatar', {
            size: { x: 52, y: 52 },
            fills: [gradient([{ hex: '#2563eb', position: 0 }, { hex: '#7c3aed', position: 1 }], 135)],
          }),
          frame('AgentInfo', {
            autoLayout: vertical({ spacing: 2 }),
            children: [
              text(name, { fontSize: 15, fontWeight: 700, color: '#1e293b' }),
              text(title, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
            ],
          }),
        ],
      }),
      frame('ContactDetails', {
        autoLayout: vertical({ spacing: 6 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(phone, { fontSize: 13, fontWeight: 500, color: '#1e293b' }),
          text(email, { fontSize: 13, fontWeight: 500, color: '#2563eb' }),
        ],
      }),
      frame('ContactBtn', {
        autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
        fills: [solid('#2563eb')],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
        children: [
          text('Schedule a Tour', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
        ],
      }),
      frame('MessageBtn', {
        autoLayout: horizontal({ spacing: 0, padY: 12, align: 'CENTER' }),
        fills: [solid('#ffffff')],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.15, g: 0.39, b: 0.92, a: 1 }, weight: 1.5, align: 'INSIDE' as const }],
        children: [
          text('Send Message', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
        ],
      }),
    ],
  });
}

export default frame('RealEstateDetailPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Hero image
    frame('HeroSection', {
      autoLayout: vertical({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('HeroImage', {
          size: { x: 1000, y: 380 },
          fills: [gradient([{ hex: '#1e3a5f', position: 0 }, { hex: '#3b82f6', position: 0.4 }, { hex: '#93c5fd', position: 0.8 }, { hex: '#dbeafe', position: 1 }], 160)],
        }),
      ],
    }),

    // Property info header
    frame('PropertyHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 36, padY: 24, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('PropertyTitle', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Lakeside Modern Villa', { fontSize: 26, fontWeight: 700, color: '#1e293b' }),
            text('42 Lakeview Drive, Bellevue, WA 98004', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
          ],
        }),
        frame('PriceSection', {
          autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }),
          children: [
            text('$1,285,000', { fontSize: 28, fontWeight: 700, color: '#2563eb' }),
            text('$428/sqft', { fontSize: 13, fontWeight: 500, color: '#64748b' }),
          ],
        }),
      ],
    }),

    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 28, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left column: details
        frame('DetailsColumn', {
          autoLayout: vertical({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Key features grid
            frame('FeaturesGrid', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Key Features', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                frame('FeaturesRow1', {
                  autoLayout: horizontal({ spacing: 10 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    featureItem('🛏', '4', 'Bedrooms'),
                    featureItem('🛁', '3.5', 'Bathrooms'),
                    featureItem('📐', '3,000', 'Sq Ft'),
                    featureItem('🏗', '2019', 'Built'),
                  ],
                }),
              ],
            }),

            // Description
            frame('Description', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('About This Property', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                text('This stunning lakeside modern villa offers panoramic views of Lake Washington with floor-to-ceiling windows throughout. The open-concept living space features a chef\'s kitchen with premium appliances, a spacious master suite with a private balcony, and a landscaped backyard perfect for entertaining. Smart home technology and energy-efficient systems throughout.', {
                  fontSize: 14, fontWeight: 400, color: '#475569',
                  lineHeight: { value: 165, unit: 'PERCENT' },
                  size: { x: 560 },
                  textAutoResize: 'HEIGHT',
                }),
              ],
            }),

            // Amenities
            frame('Amenities', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Amenities', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                frame('AmenityRow1', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    amenityTag('Central AC'),
                    amenityTag('2-Car Garage'),
                    amenityTag('Smart Home'),
                    amenityTag('Lake View'),
                  ],
                }),
                frame('AmenityRow2', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    amenityTag('Heated Floors'),
                    amenityTag('Wine Cellar'),
                    amenityTag('Home Office'),
                    amenityTag('Outdoor Kitchen'),
                  ],
                }),
              ],
            }),

            // Map placeholder
            frame('MapSection', {
              autoLayout: vertical({ spacing: 10 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Location', { fontSize: 18, fontWeight: 700, color: '#1e293b' }),
                frame('MapPlaceholder', {
                  size: { x: 1, y: 200 },
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#e2e8f0')],
                  cornerRadius: 12,
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Map View', { fontSize: 16, fontWeight: 600, color: '#94a3b8' }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // Right column: agent & sidebar
        frame('SidebarColumn', {
          size: { x: 300 },
          autoLayout: vertical({ spacing: 16 }),
          children: [
            agentCard('Rachel Torres', 'Senior Real Estate Agent', '(425) 555-0182', 'rachel@luxhomes.com'),

            // Open house info
            frame('OpenHouse', {
              autoLayout: vertical({ spacing: 10, padX: 20, padY: 18 }),
              fills: [solid('#eff6ff')],
              cornerRadius: 14,
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Open House', { fontSize: 15, fontWeight: 700, color: '#1e293b' }),
                text('Saturday, March 21', { fontSize: 14, fontWeight: 600, color: '#2563eb' }),
                text('1:00 PM - 4:00 PM', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
