import figma from '@figma/code-connect';
import { PlaylistRow } from './PlaylistRow';

figma.connect(PlaylistRow, 'https://figma.com/design/placeholder/PlaylistRow', {
  props: {
    title: figma.string('Title'),
    artist: figma.string('Artist'),
    duration: figma.string('Duration'),
  },
  example: (props) => <PlaylistRow {...props} />,
});
