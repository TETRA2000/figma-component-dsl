/**
 * Weather App — Current weather, 7-day forecast, detail metrics
 * DSL features: gradient backgrounds, large typography, horizontal forecast row, detail grid
 */
import { frame, text, rectangle, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function forecastDay(day: string, high: string, low: string) {
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 6, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    children: [
      text(day, { fontSize: 12, fontWeight: 600, color: '#64748b', textAlignHorizontal: 'CENTER' }),
      rectangle('IconPlaceholder', { size: { x: 32, y: 32 }, fills: [solid('#e0f2fe')], cornerRadius: 8 }),
      text(high, { fontSize: 14, fontWeight: 600, color: '#1e293b', textAlignHorizontal: 'CENTER' }),
      text(low, { fontSize: 12, fontWeight: 400, color: '#94a3b8', textAlignHorizontal: 'CENTER' }),
    ],
  });
}

function weatherDetail(label: string, value: string, unit: string) {
  return frame(`Detail: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 11, fontWeight: 500, color: '#94a3b8' }),
      frame('DetailValue', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(value, { fontSize: 20, fontWeight: 700, color: '#1e293b' }),
          text(unit, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
        ],
      }),
    ],
  });
}

export default frame('WeatherAppPage', {
  size: { x: 480 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#e8f4f8')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 24, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('San Francisco', { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
        text('March 16', { fontSize: 14, fontWeight: 400, color: '#64748b' }),
      ],
    }),
    // Current weather card
    frame('CurrentWeather', {
      autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#3b82f6', position: 0 }, { hex: '#60a5fa', position: 0.5 }, { hex: '#93c5fd', position: 1 }], 135)],
      cornerRadius: 20,
      layoutSizingHorizontal: 'FILL',
      children: [
        text('72', { fontSize: 80, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Partly Cloudy', { fontSize: 18, fontWeight: 500, color: '#ffffffcc', textAlignHorizontal: 'CENTER' }),
        frame('HighLow', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            text('H: 76', { fontSize: 14, fontWeight: 500, color: '#ffffffaa' }),
            text('L: 58', { fontSize: 14, fontWeight: 500, color: '#ffffffaa' }),
          ],
        }),
      ],
    }),
    // 7-day forecast
    frame('ForecastSection', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('7-Day Forecast', { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
        frame('ForecastRow', {
          autoLayout: horizontal({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            forecastDay('Mon', '74', '56'),
            forecastDay('Tue', '71', '55'),
            forecastDay('Wed', '68', '52'),
            forecastDay('Thu', '70', '54'),
            forecastDay('Fri', '73', '57'),
            forecastDay('Sat', '76', '59'),
            forecastDay('Sun', '75', '58'),
          ],
        }),
      ],
    }),
    // Details grid
    frame('DetailsSection', {
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Details', { fontSize: 15, fontWeight: 600, color: '#1e293b' }),
        frame('DetailsRow1', {
          autoLayout: horizontal({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            weatherDetail('Humidity', '65', '%'),
            weatherDetail('Wind', '12', 'mph'),
            weatherDetail('UV Index', '6', 'mod'),
          ],
        }),
        frame('DetailsRow2', {
          autoLayout: horizontal({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            weatherDetail('Visibility', '10', 'mi'),
            weatherDetail('Pressure', '30.1', 'inHg'),
            weatherDetail('Dew Point', '58', 'F'),
          ],
        }),
      ],
    }),
  ],
});
