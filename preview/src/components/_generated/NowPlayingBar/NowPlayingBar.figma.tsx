import figma from '@figma/code-connect';
import { NowPlayingBar } from './NowPlayingBar';

figma.connect(NowPlayingBar, 'https://figma.com/design/placeholder/NowPlayingBar', {
  props: {
    track: figma.string('Track'),
    artist: figma.string('Artist'),
  },
  example: (props) => <NowPlayingBar {...props} />,
});
