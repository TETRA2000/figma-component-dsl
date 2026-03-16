import { TaskCard } from '../../components/_generated/TaskCard/TaskCard';
import { KanbanColumn } from '../../components/_generated/KanbanColumn/KanbanColumn';
import { TeamMember } from '../../components/_generated/TeamMember/TeamMember';

export function TaskManagerShowcase() {
  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#0f172a', fontSize: 28, fontWeight: 700, margin: 0 }}>Project Board</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Sprint 12 — March 2026</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <TeamMember name="Alex Chen" initials="AC" color="#3b82f6" />
          <TeamMember name="Sara Kim" initials="SK" color="#8b5cf6" />
          <TeamMember name="James Lee" initials="JL" color="#10b981" />
          <TeamMember name="Mia Patel" initials="MP" color="#f59e0b" />
        </div>
      </div>

      {/* Kanban board */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* To Do */}
        <KanbanColumn title="To Do" count={3} color="#3b82f6">
          <TaskCard
            title="Design settings page"
            description="Create wireframes and high-fidelity mockups for the user settings page."
            priority="high"
            assignee="Alex Chen"
            dueDate="Mar 18"
          />
          <TaskCard
            title="Write API documentation"
            description="Document all REST endpoints including request/response schemas."
            priority="medium"
            assignee="Sara Kim"
            dueDate="Mar 22"
          />
          <TaskCard
            title="Set up CI/CD pipeline"
            description="Configure GitHub Actions for automated testing and deployment."
            priority="low"
            assignee="James Lee"
            dueDate="Mar 25"
          />
        </KanbanColumn>

        {/* In Progress */}
        <KanbanColumn title="In Progress" count={2} color="#f59e0b">
          <TaskCard
            title="Implement auth flow"
            description="Build login, registration, and password reset screens with OAuth support."
            priority="high"
            assignee="Mia Patel"
            dueDate="Mar 17"
          />
          <TaskCard
            title="Refactor data layer"
            description="Migrate from REST to GraphQL for improved query performance."
            priority="medium"
            assignee="Alex Chen"
            dueDate="Mar 20"
          />
        </KanbanColumn>

        {/* Done */}
        <KanbanColumn title="Done" count={2} color="#10b981">
          <TaskCard
            title="User research interviews"
            description="Conduct 8 user interviews to validate onboarding assumptions."
            priority="high"
            assignee="Sara Kim"
            dueDate="Mar 12"
          />
          <TaskCard
            title="Set up design tokens"
            description="Define color, typography, and spacing tokens in Figma and code."
            priority="low"
            assignee="James Lee"
            dueDate="Mar 14"
          />
        </KanbanColumn>
      </div>
    </div>
  );
}
