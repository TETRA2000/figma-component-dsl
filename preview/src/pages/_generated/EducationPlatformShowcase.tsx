import { CourseCard } from '../../components/_generated/CourseCard/CourseCard';
import { LessonItem } from '../../components/_generated/LessonItem/LessonItem';
import { AchievementBadge } from '../../components/_generated/AchievementBadge/AchievementBadge';

export function EducationPlatformShowcase() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          padding: '40px 120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 32,
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Learning Hub
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '4px 0 0' }}>
            Your personalized education platform
          </p>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 320,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              border: '2px solid rgba(255,255,255,0.5)',
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            Search courses, lessons...
          </span>
        </div>
      </div>

      {/* Continue Learning */}
      <div style={{ padding: '40px 120px 0' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1f2937',
            margin: '0 0 24px',
          }}
        >
          Continue Learning
        </h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <CourseCard
            title="Web Development Bootcamp"
            instructor="Sarah Johnson"
            lessonsCount={36}
            duration="18h 45m"
            progress={65}
            category="Development"
          />
          <CourseCard
            title="UI Design Fundamentals"
            instructor="Marcus Chen"
            lessonsCount={28}
            duration="14h 20m"
            progress={40}
            category="Design"
          />
          <CourseCard
            title="Data Science with Python"
            instructor="Priya Patel"
            lessonsCount={42}
            duration="22h 10m"
            progress={85}
            category="Data Science"
          />
        </div>
      </div>

      {/* Current Lesson - Deep 3-level nesting: Course > Module > Lesson */}
      <div style={{ padding: '48px 120px 0' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1f2937',
            margin: '0 0 24px',
          }}
        >
          Current Lesson
        </h2>

        {/* Level 1: Course container */}
        <div
          style={{
            background: '#faf5ff',
            borderRadius: 16,
            border: '1px solid #ede9fe',
            padding: 24,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#7c3aed',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Web Development Bootcamp
            </span>
          </div>

          {/* Level 2: Module container */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              padding: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1f2937',
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Module 3: CSS Layouts & Flexbox
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: '#6b7280',
                    margin: '4px 0 0',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  5 lessons &middot; 2 of 5 completed
                </p>
              </div>
              <div
                style={{
                  background: '#f59e0b',
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                IN PROGRESS
              </div>
            </div>

            {/* Level 3: Lesson items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <LessonItem
                number={1}
                title="Introduction to CSS Box Model"
                subtitle="Understanding padding, margin, and borders"
                duration="12 min"
                completed={true}
              />
              <LessonItem
                number={2}
                title="Display Properties Deep Dive"
                subtitle="Block, inline, inline-block, and none"
                duration="15 min"
                completed={true}
              />
              <LessonItem
                number={3}
                title="Flexbox Fundamentals"
                subtitle="Main axis, cross axis, and flex containers"
                duration="18 min"
                completed={false}
              />
              <LessonItem
                number={4}
                title="Building Responsive Layouts"
                subtitle="Media queries and mobile-first design"
                duration="22 min"
                completed={false}
              />
              <LessonItem
                number={5}
                title="CSS Grid vs Flexbox"
                subtitle="Choosing the right layout tool for the job"
                duration="14 min"
                completed={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div style={{ padding: '48px 120px 60px' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1f2937',
            margin: '0 0 24px',
          }}
        >
          Achievements
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
            background: '#faf5ff',
            borderRadius: 16,
            padding: 32,
            border: '1px solid #ede9fe',
          }}
        >
          <AchievementBadge
            name="Fast Learner"
            earned={true}
            statusLabel="Earned"
          />
          <AchievementBadge
            name="Code Streak"
            earned={true}
            statusLabel="7 Days"
          />
          <AchievementBadge
            name="Quiz Master"
            earned={true}
            statusLabel="Earned"
          />
          <AchievementBadge
            name="Full Stack"
            earned={false}
            statusLabel="Locked"
          />
        </div>
      </div>
    </div>
  );
}
