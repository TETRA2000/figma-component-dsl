import figma from '@figma/code-connect';
import { PodcastRow } from './PodcastRow';

figma.connect(PodcastRow, 'https://figma.com/design/placeholder/PodcastRow', {
  props: {
    name: figma.string('Name'),
    author: figma.string('Author'),
    episodeCount: figma.string('Episode Count'),
  },
  example: (props) => <PodcastRow {...props} />,
});
