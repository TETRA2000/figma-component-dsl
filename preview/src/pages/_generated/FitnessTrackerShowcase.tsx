import { ActivityRing } from '../../components/_generated/ActivityRing/ActivityRing';
import { WorkoutCard } from '../../components/_generated/WorkoutCard/WorkoutCard';
import { StepCounter } from '../../components/_generated/StepCounter/StepCounter';

export function FitnessTrackerShowcase() {
  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#1a1a1a', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h1 style={{ color: '#ffffff', fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#ff6347' }}>Fit</span>Track
        </h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>March 16, 2026</span>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: 'linear-gradient(135deg, #ff6347, #ff8c00)' }} />
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Activity Rings */}
        <div>
          <h2 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 20px 0' }}>Activity</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: '28px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ActivityRing value="580" label="Move" color="#ff6347" progress={0.77} />
            <ActivityRing value="35" label="Exercise" color="#84cc16" progress={0.7} />
            <ActivityRing value="10" label="Stand" color="#3b82f6" progress={0.83} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>580 / 750 cal</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>35 / 50 min</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>10 / 12 hr</span>
          </div>
        </div>

        {/* Step Counter */}
        <div>
          <h2 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 16px 0' }}>Today&#39;s Stats</h2>
          <StepCounter steps={8432} goal={10000} color="#84cc16" />
        </div>

        {/* Recent Workouts */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: 0 }}>Recent Workouts</h2>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#ff6347', cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <WorkoutCard type="Morning Run" duration="32 min" calories="320 cal" date="Today" icon="🏃" />
            <WorkoutCard type="HIIT Session" duration="28 min" calories="410 cal" date="Today" icon="🔥" />
            <WorkoutCard type="Cycling" duration="45 min" calories="380 cal" date="Yesterday" icon="🚴" />
            <WorkoutCard type="Yoga Flow" duration="60 min" calories="180 cal" date="Yesterday" icon="🧘" />
          </div>
        </div>
      </div>
    </div>
  );
}
