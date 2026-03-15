/**
 * Streaming Player — Video + Controls + Episode Sidebar
 * Batch 8, Page 2: Media/Entertainment — Streaming video player interface
 * DSL Features: large placeholders, horizontal split layout, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaPlayer', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Top Bar
    frame('TopBar', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('← Back', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('STREAMHUB', { fontSize: 16, fontWeight: 800, color: '#e11d48' }),
      ],
    }),

    // Main Content: Video + Sidebar
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Video Area
        frame('VideoArea', {
          autoLayout: vertical({ spacing: 0 }),
          size: { x: 1060, y: undefined },
          children: [
            // Video Placeholder
            frame('VideoPlaceholder', {
              size: { x: 1060, y: 596 },
              autoLayout: vertical({ spacing: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [
                gradient([
                  { hex: '#1a1a2e', position: 0 },
                  { hex: '#0a0a14', position: 0.5 },
                  { hex: '#1a0a1e', position: 1 },
                ], 135),
              ],
              children: [
                text('▶', { fontSize: 48, fontWeight: 400, color: '#ffffff' }),
              ],
            }),

            // Playback Controls Bar
            frame('ControlsBar', {
              autoLayout: vertical({ spacing: 8, padX: 20, padY: 12 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#111111')],
              children: [
                // Progress Bar
                frame('ProgressTrack', {
                  size: { x: 1020, y: 4 },
                  fills: [solid('#333333')],
                  cornerRadius: 2,
                  clipContent: true,
                  autoLayout: horizontal({ spacing: 0 }),
                  children: [
                    rectangle('ProgressFill', {
                      size: { x: 380, y: 4 },
                      fills: [solid('#e11d48')],
                    }),
                  ],
                }),
                // Controls Row
                frame('ControlsRow', {
                  autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    frame('LeftControls', {
                      autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
                      children: [
                        text('⏮', { fontSize: 18, fontWeight: 400, color: '#ffffff' }),
                        frame('PlayPauseBtn', {
                          autoLayout: horizontal({ padX: 12, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
                          fills: [solid('#e11d48')],
                          cornerRadius: 6,
                          children: [
                            text('⏸', { fontSize: 18, fontWeight: 400, color: '#ffffff' }),
                          ],
                        }),
                        text('⏭', { fontSize: 18, fontWeight: 400, color: '#ffffff' }),
                        text('24:37 / 1:42:15', { fontSize: 13, fontWeight: 400, color: '#a3a3a3' }),
                      ],
                    }),
                    frame('ControlSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
                    frame('RightControls', {
                      autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
                      children: [
                        text('CC', { fontSize: 13, fontWeight: 600, color: '#a3a3a3' }),
                        text('HD', { fontSize: 13, fontWeight: 600, color: '#a3a3a3' }),
                        text('🔊', { fontSize: 16, fontWeight: 400, color: '#ffffff' }),
                        text('⛶', { fontSize: 18, fontWeight: 400, color: '#ffffff' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Title and Description
            frame('VideoInfo', {
              autoLayout: vertical({ spacing: 12, padX: 20, padY: 24 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('The Last Horizon — Episode 3: Beyond the Veil', {
                  fontSize: 22, fontWeight: 700, color: '#ffffff',
                }),
                text('Season 1  •  Episode 3  •  TV-MA  •  52 min', {
                  fontSize: 14, fontWeight: 400, color: '#737373',
                }),
                text('As the crew ventures deeper into uncharted space, Commander Reyes discovers an anomaly that challenges everything they thought they knew about the universe. Meanwhile, tensions rise aboard the Horizon as resources dwindle.', {
                  fontSize: 15, fontWeight: 400, color: '#a3a3a3',
                  lineHeight: { value: 24, unit: 'PIXELS' },
                  size: { x: 700 }, textAutoResize: 'HEIGHT',
                }),
              ],
            }),
          ],
        }),

        // Episode Sidebar
        frame('EpisodeSidebar', {
          autoLayout: vertical({ spacing: 0, padY: 0 }),
          size: { x: 380, y: undefined },
          fills: [solid('#111111')],
          children: [
            frame('SidebarHeader', {
              autoLayout: horizontal({ spacing: 0, padX: 20, padY: 16, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#1a1a1a')],
              children: [
                text('Episodes', { fontSize: 16, fontWeight: 700, color: '#ffffff' }),
                frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
                text('Season 1 ▾', { fontSize: 13, fontWeight: 500, color: '#a3a3a3' }),
              ],
            }),
            episodeItem(1, 'Departure', '48 min', false),
            episodeItem(2, 'Into the Void', '51 min', false),
            episodeItem(3, 'Beyond the Veil', '52 min', true),
            episodeItem(4, 'Echoes', '49 min', false),
            episodeItem(5, 'Convergence', '55 min', false),
            episodeItem(6, 'The Signal', '47 min', false),
            episodeItem(7, 'Aftermath', '53 min', false),
            episodeItem(8, 'Homeward', '61 min', false),
          ],
        }),
      ],
    }),
  ],
});

function episodeItem(num: number, title: string, duration: string, active: boolean) {
  return frame(`Episode ${num}`, {
    autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: active ? [solid('#1a1a1a')] : [],
    children: [
      // Thumbnail placeholder
      rectangle('Thumb', {
        size: { x: 120, y: 68 },
        fills: [
          gradient([
            { hex: '#1a1a2e', position: 0 },
            { hex: '#0a0a14', position: 1 },
          ], 135),
        ],
        cornerRadius: 4,
      }),
      frame('EpInfo', {
        autoLayout: vertical({ spacing: 4 }),
        children: [
          text(`${num}. ${title}`, {
            fontSize: 14,
            fontWeight: active ? 600 : 400,
            color: active ? '#e11d48' : '#ffffff',
          }),
          text(duration, { fontSize: 12, fontWeight: 400, color: '#737373' }),
          // Progress indicator for active
          ...(active ? [
            frame('EpProgress', {
              size: { x: 160, y: 3 },
              fills: [solid('#333333')],
              cornerRadius: 2,
              clipContent: true,
              autoLayout: horizontal({ spacing: 0 }),
              children: [
                rectangle('EpFill', {
                  size: { x: 60, y: 3 },
                  fills: [solid('#e11d48')],
                }),
              ],
            }),
          ] : []),
        ],
      }),
    ],
  });
}
