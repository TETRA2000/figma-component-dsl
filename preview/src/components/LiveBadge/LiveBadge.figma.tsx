import figma from '@figma/code-connect';
import { LiveBadge } from './LiveBadge';

figma.connect(LiveBadge, 'TODO_FIGMA_URL', {
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => <LiveBadge label={label} />,
});
