import figma from '@figma/code-connect';
import { TrackItem } from './TrackItem';

figma.connect(TrackItem, 'https://figma.com/design/placeholder/TrackItem', {
  props: {
    number: figma.number('Number'),
    title: figma.string('Title'),
    artist: figma.string('Artist'),
    duration: figma.string('Duration'),
    artColor: figma.string('Art Color'),
    playing: figma.boolean('Playing'),
  },
  example: (props) => <TrackItem {...props} />,
});
