import figma from '@figma/code-connect';
import { PlayerControls } from './PlayerControls';

figma.connect(PlayerControls, 'https://figma.com/design/placeholder/PlayerControls', {
  props: {
    currentTime: figma.string('Current Time'),
    totalTime: figma.string('Total Time'),
    progress: figma.number('Progress'),
  },
  example: (props) => <PlayerControls {...props} />,
});
