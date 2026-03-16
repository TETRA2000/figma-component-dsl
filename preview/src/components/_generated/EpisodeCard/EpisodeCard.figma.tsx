import figma from '@figma/code-connect';
import { EpisodeCard } from './EpisodeCard';

figma.connect(EpisodeCard, 'https://figma.com/design/placeholder/EpisodeCard', {
  props: {
    title: figma.string('Title'),
    podcastName: figma.string('Podcast Name'),
    duration: figma.string('Duration'),
  },
  example: (props) => <EpisodeCard {...props} />,
});
