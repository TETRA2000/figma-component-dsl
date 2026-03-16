import figma from '@figma/code-connect';
import { AlbumHeader } from './AlbumHeader';

figma.connect(AlbumHeader, 'https://figma.com/design/placeholder/AlbumHeader', {
  props: {
    title: figma.string('Title'),
    artist: figma.string('Artist'),
    year: figma.number('Year'),
    trackCount: figma.number('Track Count'),
    gradientFrom: figma.string('Gradient From'),
    gradientTo: figma.string('Gradient To'),
  },
  example: (props) => <AlbumHeader {...props} />,
});
