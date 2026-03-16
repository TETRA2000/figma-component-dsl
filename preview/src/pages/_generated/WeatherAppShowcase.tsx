import { WeatherCard } from '../../components/_generated/WeatherCard/WeatherCard';
import { ForecastDay } from '../../components/_generated/ForecastDay/ForecastDay';
import { WeatherDetail } from '../../components/_generated/WeatherDetail/WeatherDetail';

export function WeatherAppShowcase() {
  return (
    <div style={{ background: '#e8f4f8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#1a202c', fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            San Francisco, CA
          </h1>
          <span style={{ color: '#718096', fontSize: 14, fontWeight: 500 }}>Sunday, March 16, 2026</span>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: 'linear-gradient(135deg, #56ccf2, #2f80ed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 18 }}>📍</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Current Weather */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WeatherCard city="San Francisco" temp={72} condition="Partly Cloudy" high={76} low={58} color="cloudy" />
        </div>

        {/* 7-Day Forecast */}
        <div>
          <h2 style={{ color: '#1a202c', fontSize: 16, fontWeight: 700, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            7-Day Forecast
          </h2>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
            <ForecastDay day="Mon" high={74} low={57} icon="🌤️" />
            <ForecastDay day="Tue" high={70} low={55} icon="☁️" />
            <ForecastDay day="Wed" high={68} low={54} icon="🌧️" />
            <ForecastDay day="Thu" high={65} low={52} icon="🌧️" />
            <ForecastDay day="Fri" high={71} low={56} icon="⛅" />
            <ForecastDay day="Sat" high={75} low={59} icon="☀️" />
            <ForecastDay day="Sun" high={78} low={61} icon="☀️" />
          </div>
        </div>

        {/* Weather Details */}
        <div>
          <h2 style={{ color: '#1a202c', fontSize: 16, fontWeight: 700, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <WeatherDetail label="Humidity" value="65" unit="%" />
            <WeatherDetail label="Wind" value="12" unit="mph" />
            <WeatherDetail label="UV Index" value="6" unit="" />
            <WeatherDetail label="Visibility" value="10" unit="mi" />
            <WeatherDetail label="Pressure" value="30.1" unit="inHg" />
            <WeatherDetail label="Dew Point" value="58" unit="°F" />
          </div>
        </div>
      </div>
    </div>
  );
}
