import { EpisodeCard } from '../../components/_generated/EpisodeCard/EpisodeCard';
import { PodcastRow } from '../../components/_generated/PodcastRow/PodcastRow';
import { NowPlaying } from '../../components/_generated/NowPlaying/NowPlaying';

const continueListening = [
  {
    title: 'The Future of AI',
    podcastName: 'Tech Talks Daily',
    duration: '42 min',
    gradientFrom: '#7c3aed',
    gradientTo: '#2563eb',
  },
  {
    title: 'Building Habits That Stick',
    podcastName: 'Mind & Matter',
    duration: '38 min',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
  },
  {
    title: 'Deep Ocean Mysteries',
    podcastName: 'Science Unplugged',
    duration: '55 min',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
  },
];

const library = [
  {
    name: 'Tech Talks Daily',
    author: 'Sarah Chen',
    episodeCount: 342,
    gradientFrom: '#7c3aed',
    gradientTo: '#2563eb',
  },
  {
    name: 'Mind & Matter',
    author: 'Dr. James Wu',
    episodeCount: 186,
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
  },
  {
    name: 'Science Unplugged',
    author: 'Nova Institute',
    episodeCount: 97,
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
  },
  {
    name: 'Creative Fuel',
    author: 'Mia Torres',
    episodeCount: 214,
    gradientFrom: '#ec4899',
    gradientTo: '#8b5cf6',
  },
  {
    name: 'History After Dark',
    author: 'Leo Grant',
    episodeCount: 63,
    gradientFrom: '#10b981',
    gradientTo: '#065f46',
  },
];

export function PodcastAppShowcase() {
  return (
    <div
      style={{
        background: '#18181b',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: '32px 28px 120px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1 style={{ color: '#fafafa', fontSize: 28, fontWeight: 700, margin: 0 }}>Podcasts</h1>
        <div
          style={{
            background: '#27272a',
            borderRadius: 10,
            padding: '10px 16px',
            flex: 1,
            maxWidth: 280,
            color: '#71717a',
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Search podcasts...
        </div>
      </div>

      {/* Now Playing */}
      <div>
        <h2 style={{ color: '#a1a1aa', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Now Playing
        </h2>
        <NowPlaying
          title="The Future of AI"
          podcastName="Tech Talks Daily"
          progress={35}
          isPlaying={true}
          gradientFrom="#7c3aed"
          gradientTo="#2563eb"
        />
      </div>

      {/* Continue Listening */}
      <div>
        <h2 style={{ color: '#a1a1aa', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px' }}>
          Continue Listening
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {continueListening.map((ep) => (
            <EpisodeCard
              key={ep.title}
              title={ep.title}
              podcastName={ep.podcastName}
              duration={ep.duration}
              gradientFrom={ep.gradientFrom}
              gradientTo={ep.gradientTo}
            />
          ))}
        </div>
      </div>

      {/* Your Library */}
      <div>
        <h2 style={{ color: '#a1a1aa', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px' }}>
          Your Library
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {library.map((pod) => (
            <PodcastRow
              key={pod.name}
              name={pod.name}
              author={pod.author}
              episodeCount={pod.episodeCount}
              gradientFrom={pod.gradientFrom}
              gradientTo={pod.gradientTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
