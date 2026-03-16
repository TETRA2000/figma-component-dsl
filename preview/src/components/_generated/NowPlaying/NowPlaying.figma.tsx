import figma from '@figma/code-connect';
import { NowPlaying } from './NowPlaying';

figma.connect(NowPlaying, 'https://figma.com/design/placeholder/NowPlaying', {
  props: {
    title: figma.string('Title'),
    podcastName: figma.string('Podcast Name'),
    progress: figma.string('Progress'),
    isPlaying: figma.boolean('Is Playing'),
  },
  example: (props) => <NowPlaying {...props} />,
});
