import figma from '@figma/code-connect';
import { AlbumCard } from './AlbumCard';

figma.connect(AlbumCard, 'https://figma.com/design/placeholder/AlbumCard', {
  props: {
    title: figma.string('Title'),
    artist: figma.string('Artist'),
  },
  example: (props) => <AlbumCard {...props} />,
});
