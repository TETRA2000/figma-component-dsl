import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: tenki.jp style — Data-dense weather grid, color-coded temperatures, forecasts
const blue = '#2196f3'; const dark = '#1a1a2a'; const white = '#ffffff'; const bg = '#eef2f6';
const med = '#606878'; const red = '#e53935'; const orange = '#ff9800'; const skyBlue = '#87ceeb';

function dayForecast(day: string, weather: string, high: string, low: string, rain: string) {
  const highNum = parseInt(high);
  const tempColor = highNum >= 25 ? red : highNum >= 20 ? orange : blue;
  return frame(`Day: ${day}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 10, counterAlign: 'CENTER' }),
    fills: [solid(white)], cornerRadius: 4, size: { x: 120, y: undefined },
    children: [
      text(day, { fontSize: 12, fontWeight: 600, color: dark }),
      ellipse('WeatherIcon', { size: { x: 32, y: 32 }, fills: [solid(skyBlue, 0.2)] }),
      text(weather, { fontSize: 10, fontWeight: 400, color: med }),
      frame('Temps', { autoLayout: horizontal({ spacing: 6 }), children: [
        text(`${high}°`, { fontSize: 16, fontWeight: 700, color: tempColor }),
        text(`${low}°`, { fontSize: 12, fontWeight: 400, color: blue }),
      ]}),
      text(`Rain ${rain}`, { fontSize: 9, fontWeight: 400, color: med }),
    ],
  });
}

function cityRow(city: string, temp: string, weather: string, humidity: string) {
  const tempNum = parseInt(temp);
  const tempColor = tempNum >= 25 ? red : tempNum >= 20 ? orange : tempNum >= 10 ? '#4caf50' : blue;
  return frame(`City: ${city}`, {
    autoLayout: horizontal({ padX: 12, padY: 8, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: [solid(white)],
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(city, { fontSize: 13, fontWeight: 500, color: dark, size: { x: 100 } }),
      text(`${temp}°C`, { fontSize: 16, fontWeight: 700, color: tempColor, size: { x: 70 } }),
      text(weather, { fontSize: 12, fontWeight: 400, color: med, size: { x: 80 } }),
      text(`${humidity}%`, { fontSize: 12, fontWeight: 400, color: blue, size: { x: 50 } }),
    ],
  });
}

export default frame('WeatherService', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 32, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(blue)],
      children: [
        text('tenki.jp', { fontSize: 18, fontWeight: 700, color: white }),
        frame('Nav', { autoLayout: horizontal({ spacing: 16 }), children: [
          text('Forecast', { fontSize: 12, fontWeight: 500, color: white }),
          text('Radar', { fontSize: 12, fontWeight: 400, color: '#b0d0f0' }),
          text('Warnings', { fontSize: 12, fontWeight: 400, color: '#b0d0f0' }),
          text('Pollen', { fontSize: 12, fontWeight: 400, color: '#b0d0f0' }),
        ]}),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 16, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('ForecastColumn', { autoLayout: vertical({ spacing: 12 }), size: { x: 580, y: undefined }, children: [
          frame('TodayHeader', { autoLayout: horizontal({ align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }), layoutSizingHorizontal: 'FILL', children: [
            text('Tokyo - 7 Day Forecast', { fontSize: 16, fontWeight: 700, color: dark }),
            text('Updated 15:00', { fontSize: 10, fontWeight: 400, color: med }),
          ]}),
          frame('TodayDetail', { autoLayout: horizontal({ spacing: 16, padX: 20, padY: 16, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL', fills: [solid(white)], cornerRadius: 6, children: [
            frame('TodayLeft', { autoLayout: vertical({ spacing: 4 }), children: [
              text('Today', { fontSize: 14, fontWeight: 600, color: dark }),
              text('Partly Cloudy', { fontSize: 12, fontWeight: 400, color: med }),
            ]}),
            frame('TodayTemp', { autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }), children: [
              text('18', { fontSize: 42, fontWeight: 300, color: dark }),
              text('°C', { fontSize: 18, fontWeight: 300, color: med }),
            ]}),
            frame('TodayStats', { autoLayout: vertical({ spacing: 4 }), children: [
              text('Humidity: 52%', { fontSize: 11, fontWeight: 400, color: med }),
              text('Wind: 12 km/h NW', { fontSize: 11, fontWeight: 400, color: med }),
              text('UV Index: 4', { fontSize: 11, fontWeight: 400, color: med }),
            ]}),
          ]}),
          frame('WeekForecast', { autoLayout: horizontal({ spacing: 6 }), children: [
            dayForecast('Sat', 'Sunny', '20', '12', '0%'),
            dayForecast('Sun', 'Cloudy', '18', '11', '20%'),
            dayForecast('Mon', 'Rain', '15', '10', '80%'),
            dayForecast('Tue', 'Rain', '14', '9', '70%'),
            dayForecast('Wed', 'Cloudy', '17', '10', '30%'),
            dayForecast('Thu', 'Sunny', '22', '13', '0%'),
            dayForecast('Fri', 'Sunny', '24', '14', '0%'),
          ]}),
        ]}),
        frame('CitiesColumn', { autoLayout: vertical({ spacing: 8 }), size: { x: 380, y: undefined }, children: [
          text('Major Cities', { fontSize: 14, fontWeight: 700, color: dark }),
          cityRow('Sapporo', '5', 'Snow', '68'),
          cityRow('Sendai', '12', 'Cloudy', '55'),
          cityRow('Tokyo', '18', 'Partly Cloudy', '52'),
          cityRow('Nagoya', '19', 'Sunny', '48'),
          cityRow('Osaka', '20', 'Sunny', '50'),
          cityRow('Hiroshima', '21', 'Sunny', '46'),
          cityRow('Fukuoka', '22', 'Sunny', '44'),
          cityRow('Naha', '26', 'Partly Cloudy', '72'),
        ]}),
      ],
    }),
  ],
});
