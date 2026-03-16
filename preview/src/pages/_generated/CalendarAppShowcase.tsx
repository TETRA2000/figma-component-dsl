import { CalendarEvent } from '../../components/_generated/CalendarEvent/CalendarEvent';
import { DayColumn } from '../../components/_generated/DayColumn/DayColumn';
import { MiniCalendar } from '../../components/_generated/MiniCalendar/MiniCalendar';

export function CalendarAppShowcase() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#1e293b',
              margin: 0,
            }}
          >
            March 2026
          </h1>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#64748b',
              }}
            >
              &larr;
            </button>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#64748b',
              }}
            >
              &rarr;
            </button>
          </div>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#3b82f6',
            }}
          >
            Today
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            Day
          </span>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#ffffff',
              background: '#3b82f6',
              cursor: 'pointer',
            }}
          >
            Week
          </span>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            Month
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 260,
            borderRight: '1px solid #e2e8f0',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <MiniCalendar month="March" year={2026} todayDate={16} />

          {/* Upcoming Events */}
          <div>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1e293b',
                margin: '0 0 12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Upcoming
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CalendarEvent
                title="Team Standup"
                startTime="9:00 AM"
                endTime="9:30 AM"
                location="Room 3A"
                color="blue"
              />
              <CalendarEvent
                title="Lunch with Sarah"
                startTime="12:30 PM"
                endTime="1:30 PM"
                location="Cafe Nero"
                color="green"
              />
              <CalendarEvent
                title="Sprint Review"
                startTime="3:00 PM"
                endTime="4:00 PM"
                location="Main Conference"
                color="orange"
              />
            </div>
          </div>
        </div>

        {/* Week View */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            borderTop: 'none',
          }}
        >
          <DayColumn dayName="Mon" dateNumber={16} isToday>
            <CalendarEvent
              title="Team Standup"
              startTime="9:00 AM"
              endTime="9:30 AM"
              location="Room 3A"
              color="blue"
            />
            <CalendarEvent
              title="Lunch with Sarah"
              startTime="12:30 PM"
              endTime="1:30 PM"
              location="Cafe Nero"
              color="green"
            />
            <CalendarEvent
              title="Sprint Review"
              startTime="3:00 PM"
              endTime="4:00 PM"
              location="Main Conference"
              color="orange"
            />
          </DayColumn>

          <DayColumn dayName="Tue" dateNumber={17}>
            <CalendarEvent
              title="Design Sync"
              startTime="10:00 AM"
              endTime="10:45 AM"
              location="Figma Room"
              color="blue"
            />
            <CalendarEvent
              title="Yoga Class"
              startTime="6:00 PM"
              endTime="7:00 PM"
              location="Studio B"
              color="green"
            />
          </DayColumn>

          <DayColumn dayName="Wed" dateNumber={18}>
            <CalendarEvent
              title="Client Call"
              startTime="11:00 AM"
              endTime="12:00 PM"
              location="Zoom"
              color="orange"
            />
            <CalendarEvent
              title="Code Review"
              startTime="2:00 PM"
              endTime="2:30 PM"
              location="Slack Huddle"
              color="blue"
            />
            <CalendarEvent
              title="Gym"
              startTime="5:30 PM"
              endTime="6:30 PM"
              location="FitZone"
              color="green"
            />
          </DayColumn>

          <DayColumn dayName="Thu" dateNumber={19}>
            <CalendarEvent
              title="Product Roadmap"
              startTime="9:30 AM"
              endTime="10:30 AM"
              location="Board Room"
              color="orange"
            />
            <CalendarEvent
              title="1:1 with Manager"
              startTime="1:00 PM"
              endTime="1:30 PM"
              location="Office 204"
              color="blue"
            />
          </DayColumn>

          <DayColumn dayName="Fri" dateNumber={20}>
            <CalendarEvent
              title="Team Standup"
              startTime="9:00 AM"
              endTime="9:30 AM"
              location="Room 3A"
              color="blue"
            />
            <CalendarEvent
              title="All Hands"
              startTime="11:00 AM"
              endTime="12:00 PM"
              location="Auditorium"
              color="orange"
            />
            <CalendarEvent
              title="Happy Hour"
              startTime="4:30 PM"
              endTime="6:00 PM"
              location="The Draft"
              color="green"
            />
          </DayColumn>
        </div>
      </div>
    </div>
  );
}
