import { VitalCard } from '../../components/_generated/VitalCard/VitalCard';
import { AppointmentRow } from '../../components/_generated/AppointmentRow/AppointmentRow';
import { MedicationPill } from '../../components/_generated/MedicationPill/MedicationPill';

export function HealthcareDashboardShowcase() {
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 4px', fontWeight: 500 }}>Good morning</p>
        <h1 style={{ color: '#111827', fontSize: 28, fontWeight: 700, margin: 0 }}>My Health</h1>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Alex Johnson</p>
      </div>

      {/* Vital signs row */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ color: '#111827', fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Vitals</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <VitalCard
            label="Heart Rate"
            value="72"
            unit="bpm"
            icon={'\u2764\ufe0f'}
            status="normal"
            color="#0d9488"
          />
          <VitalCard
            label="Blood Pressure"
            value="120/80"
            unit="mmHg"
            icon={'\ud83e\ude78'}
            status="normal"
            color="#3b82f6"
          />
          <VitalCard
            label="O2 Level"
            value="98"
            unit="%"
            icon={'\ud83e\udec1'}
            status="normal"
            color="#0d9488"
          />
          <VitalCard
            label="Temperature"
            value="98.6"
            unit={'\u00b0F'}
            icon={'\ud83c\udf21\ufe0f'}
            status="normal"
            color="#0d9488"
          />
        </div>
      </div>

      {/* Appointments section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ color: '#111827', fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Upcoming Appointments</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AppointmentRow
            time="9:30"
            period="AM"
            doctorName="Dr. Sarah Chen"
            specialty="Cardiology"
            avatarEmoji={'\ud83d\udc69\u200d\u2695\ufe0f'}
          />
          <AppointmentRow
            time="11:00"
            period="AM"
            doctorName="Dr. James Wilson"
            specialty="General Practice"
            avatarEmoji={'\ud83d\udc68\u200d\u2695\ufe0f'}
          />
          <AppointmentRow
            time="2:15"
            period="PM"
            doctorName="Dr. Maya Patel"
            specialty="Dermatology"
            avatarEmoji={'\ud83d\udc69\u200d\u2695\ufe0f'}
          />
        </div>
      </div>

      {/* Medications section */}
      <div>
        <h2 style={{ color: '#111827', fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Medications</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <MedicationPill name="Lisinopril" dosage="10mg" time="8:00 AM" color="#0d9488" />
          <MedicationPill name="Metformin" dosage="500mg" time="8:00 AM" color="#3b82f6" />
          <MedicationPill name="Vitamin D" dosage="2000 IU" time="12:00 PM" color="#f59e0b" />
          <MedicationPill name="Atorvastatin" dosage="20mg" time="9:00 PM" color="#8b5cf6" />
        </div>
      </div>
    </div>
  );
}
