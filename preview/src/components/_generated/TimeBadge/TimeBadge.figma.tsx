import figma from '@figma/code-connect';
import { TimeBadge } from './TimeBadge';

figma.connect(TimeBadge, 'https://figma.com/design/placeholder/TimeBadge', {
  props: {
    minutes: figma.string('Minutes'),
  },
  example: (props) => <TimeBadge {...props} />,
});
