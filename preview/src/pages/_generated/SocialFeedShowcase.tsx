import { PostCard } from '../../components/_generated/PostCard/PostCard';
import { AvatarCircle } from '../../components/_generated/AvatarCircle/AvatarCircle';

export function SocialFeedShowcase() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Top navigation bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #eff3f4',
          padding: '0 16px',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 53,
          }}
        >
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#0f1419',
              margin: 0,
            }}
          >
            Home
          </h1>
          <button
            type="button"
            style={{
              background: '#1d9bf0',
              color: '#ffffff',
              border: 'none',
              borderRadius: 9999,
              padding: '8px 20px',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
            }}
          >
            Compose
          </button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 700,
              color: '#0f1419',
              borderBottom: '3px solid #1d9bf0',
            }}
          >
            For you
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 500,
              color: '#536471',
              borderBottom: '3px solid transparent',
            }}
          >
            Following
          </div>
        </div>
      </div>

      {/* Feed container */}
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Compose area */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            padding: 16,
            borderBottom: '1px solid #eff3f4',
          }}
        >
          <AvatarCircle initials="ME" size={40} online />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                fontSize: 20,
                color: '#536471',
                padding: '12px 0',
                borderBottom: '1px solid #eff3f4',
              }}
            >
              What is happening?!
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                style={{
                  background: '#1d9bf0',
                  opacity: 0.5,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 9999,
                  padding: '8px 20px',
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'not-allowed',
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 4, background: '#f3f4f6' }} />

        {/* Post cards */}
        <PostCard
          initials="SK"
          username="Sarah Kim"
          handle="@sarahkim"
          timestamp="12m"
          body="Just discovered an amazing coffee shop downtown. The latte art is incredible! Anyone else been to Blue Bottle on 5th?"
          likes={128}
          comments={24}
          shares={8}
          bookmarks={45}
          online
        />

        <PostCard
          initials="JD"
          username="James Donovan"
          handle="@jamesdev"
          timestamp="1h"
          body={"Shipped v2.0 of our design system today! Six months of work from an incredible team.\n\nHighlights:\n- New token architecture\n- Accessible by default\n- 40% smaller bundle size\n\nThread below with details..."}
          likes={2340}
          comments={187}
          shares={412}
          bookmarks={890}
        />

        <PostCard
          initials="MR"
          username="Maya Rodriguez"
          handle="@mayabuilds"
          timestamp="3h"
          body="Hot take: the best documentation is the code itself. If your API needs a paragraph of explanation, the abstraction is wrong."
          likes={567}
          comments={93}
          shares={52}
          bookmarks={201}
          online
        />

        <PostCard
          initials="TN"
          username="Tomoko Nakamura"
          handle="@tomokodesigns"
          timestamp="5h"
          body="Working on a social feed UI for our component library. Something satisfying about getting the spacing and typography just right. Sharing the Figma file with the team tomorrow."
          likes={89}
          comments={12}
          shares={5}
          bookmarks={34}
        />
      </div>
    </div>
  );
}
