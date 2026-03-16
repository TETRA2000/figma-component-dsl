import { ChatBubble } from '../../components/_generated/ChatBubble/ChatBubble';
import { ConversationItem } from '../../components/_generated/ConversationItem/ConversationItem';
import { ChatHeader } from '../../components/_generated/ChatHeader/ChatHeader';

const conversations = [
  { initials: 'SC', color: '#6366f1', name: 'Sarah Chen', message: 'That sounds great! Let me know...', time: '2:34 PM', unread: 0, selected: true },
  { initials: 'JD', color: '#f59e0b', name: 'James Donovan', message: 'Did you see the latest update?', time: '1:15 PM', unread: 3, selected: false },
  { initials: 'MR', color: '#ec4899', name: 'Maria Rodriguez', message: 'Meeting rescheduled to 3pm', time: '12:02 PM', unread: 1, selected: false },
  { initials: 'AK', color: '#14b8a6', name: 'Alex Kim', message: 'Thanks for sending that over!', time: 'Yesterday', unread: 0, selected: false },
  { initials: 'LP', color: '#8b5cf6', name: 'Lisa Park', message: 'Can you review the PR when free?', time: 'Yesterday', unread: 0, selected: false },
];

const messages: { text: string; variant: 'sent' | 'received'; time: string }[] = [
  { text: 'Hey Sarah! How is the new design system coming along?', variant: 'sent', time: '2:20 PM' },
  { text: 'Hi! It is going really well. We finalized the color tokens yesterday.', variant: 'received', time: '2:22 PM' },
  { text: 'That is awesome. Are the component specs ready for the handoff?', variant: 'sent', time: '2:24 PM' },
  { text: 'Almost! I have the buttons, inputs, and cards done. Working on the navigation components now.', variant: 'received', time: '2:26 PM' },
  { text: 'Perfect. The engineering team is excited to start building with the new system.', variant: 'sent', time: '2:28 PM' },
  { text: 'I can share a preview link tomorrow if you want to take a look early.', variant: 'received', time: '2:30 PM' },
  { text: 'Yes please! That would be really helpful for the sprint planning.', variant: 'sent', time: '2:32 PM' },
  { text: 'That sounds great! Let me know if there are any specific components you want me to prioritize.', variant: 'received', time: '2:34 PM' },
];

export function ChatMessengerShowcase() {
  return (
    <div
      style={{
        background: '#f1f5f9',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 960,
          height: 'calc(100vh - 64px)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
          background: '#ffffff',
        }}
      >
        {/* Left panel - conversation list */}
        <div
          style={{
            width: 280,
            minWidth: 280,
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            background: '#ffffff',
          }}
        >
          {/* Search bar */}
          <div style={{ padding: '16px 12px 8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f1f5f9',
                borderRadius: 10,
                padding: '8px 12px',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7" cy="7" r="5.25" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M11 11L14 14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: '#94a3b8',
                }}
              >
                Search conversations...
              </span>
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
            {conversations.map((c) => (
              <ConversationItem
                key={c.name}
                avatarInitials={c.initials}
                avatarColor={c.color}
                name={c.name}
                lastMessage={c.message}
                time={c.time}
                unreadCount={c.unread}
                selected={c.selected}
              />
            ))}
          </div>
        </div>

        {/* Right panel - chat area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#ffffff',
            minWidth: 0,
          }}
        >
          {/* Chat header */}
          <ChatHeader
            name="Sarah Chen"
            avatarInitials="SC"
            avatarColor="#6366f1"
            online
          />

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              background: '#fafbfc',
            }}
          >
            {messages.map((m, i) => (
              <ChatBubble
                key={i}
                text={m.text}
                timestamp={m.time}
                variant={m.variant}
              />
            ))}
          </div>

          {/* Text input area */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#ffffff',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: '#f1f5f9',
                borderRadius: 24,
                padding: '10px 16px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#94a3b8',
                }}
              >
                Type a message...
              </span>
            </div>
            <button
              type="button"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#3b82f6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 2L8 10M16 2L11 16L8 10M16 2L2 7L8 10"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
