import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const skyBlue = '#0ea5e9'; const skyDark = '#0369a1'; const white = '#ffffff'; const bg = '#f0f9ff';
const dark = '#0c4a6e'; const med = '#64748b'; const amber = '#f59e0b'; const gray = '#cbd5e1';

function hourForecast(time: string, temp: string, condition: string) {
  return frame(`Hour: ${time}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(white, 0.8)], cornerRadius: 12,
    children: [
      text(time, { fontSize: 12, fontWeight: 500, color: med }),
      ellipse('CondIcon', { size: { x: 28, y: 28 }, fills: [solid(condition === 'sunny' ? amber : skyBlue, 0.3)] }),
      text(temp, { fontSize: 16, fontWeight: 600, color: dark }),
    ],
  });
}

function dayForecast(day: string, high: string, low: string, condition: string) {
  return frame(`Day: ${day}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.88, g: 0.93, b: 0.97, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(day, { fontSize: 14, fontWeight: 500, color: dark }),
      ellipse('CondIcon', { size: { x: 24, y: 24 }, fills: [solid(condition === 'sunny' ? amber : skyBlue, 0.3)] }),
      frame('Temps', { autoLayout: horizontal({ spacing: 8 }), children: [
        text(high, { fontSize: 14, fontWeight: 600, color: dark }),
        text(low, { fontSize: 14, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

function detailCard(label: string, value: string, unit: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
    fills: [solid(white)], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 400, color: med }),
      frame('Val', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }), children: [
        text(value, { fontSize: 22, fontWeight: 700, color: dark }),
        text(unit, { fontSize: 13, fontWeight: 400, color: med }),
      ]}),
    ],
  });
}

export default frame('WeatherApp', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('WeatherFlow', { fontSize: 20, fontWeight: 700, color: skyBlue }),
        text('San Francisco, CA', { fontSize: 14, fontWeight: 500, color: dark }),
      ],
    }),
    frame('CurrentWeather', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: skyBlue, position: 0 }, { hex: skyDark, position: 1 }], 180)],
      children: [
        ellipse('SunIcon', { size: { x: 80, y: 80 }, fills: [solid(amber, 0.4)] }),
        text('72°', { fontSize: 72, fontWeight: 700, color: white }),
        text('Partly Cloudy', { fontSize: 18, fontWeight: 400, color: '#bae6fd' }),
        text('Feels like 68° · UV Index 5', { fontSize: 14, fontWeight: 400, color: '#7dd3fc' }),
      ],
    }),
    frame('HourlyForecast', {
      autoLayout: horizontal({ spacing: 8, padX: 48, padY: 20 }), layoutSizingHorizontal: 'FILL',
      children: [
        hourForecast('Now', '72°', 'sunny'),
        hourForecast('1PM', '74°', 'sunny'),
        hourForecast('2PM', '75°', 'sunny'),
        hourForecast('3PM', '73°', 'cloudy'),
        hourForecast('4PM', '71°', 'cloudy'),
        hourForecast('5PM', '69°', 'cloudy'),
        hourForecast('6PM', '66°', 'cloudy'),
        hourForecast('7PM', '64°', 'cloudy'),
      ],
    }),
    frame('BottomSection', {
      autoLayout: horizontal({ spacing: 24, padX: 48, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('DailyForecast', {
          autoLayout: vertical({ spacing: 0, padX: 16, padY: 16 }), fills: [solid(white)],
          cornerRadius: 16, layoutSizingHorizontal: 'FILL',
          children: [
            text('7-Day Forecast', { fontSize: 16, fontWeight: 600, color: dark }),
            dayForecast('Tomorrow', '75°', '58°', 'sunny'),
            dayForecast('Wednesday', '70°', '55°', 'cloudy'),
            dayForecast('Thursday', '68°', '54°', 'cloudy'),
            dayForecast('Friday', '72°', '56°', 'sunny'),
            dayForecast('Saturday', '76°', '60°', 'sunny'),
            dayForecast('Sunday', '74°', '59°', 'sunny'),
            dayForecast('Monday', '71°', '57°', 'cloudy'),
          ],
        }),
        frame('Details', {
          autoLayout: vertical({ spacing: 12 }), size: { x: 360, y: undefined },
          children: [
            text('Details', { fontSize: 16, fontWeight: 600, color: dark }),
            frame('DetailGrid', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              detailCard('Humidity', '62', '%'),
              detailCard('Wind', '12', 'mph'),
            ]}),
            frame('DetailGrid2', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              detailCard('Pressure', '30.1', 'inHg'),
              detailCard('Visibility', '10', 'mi'),
            ]}),
            frame('DetailGrid3', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              detailCard('Sunrise', '6:42', 'AM'),
              detailCard('Sunset', '7:18', 'PM'),
            ]}),
          ],
        }),
      ],
    }),
  ],
});
