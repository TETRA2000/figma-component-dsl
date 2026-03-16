import figma from '@figma/code-connect';
import { ActivityRing } from './ActivityRing';
figma.connect(ActivityRing, 'https://figma.com/design/placeholder/ActivityRing', {
  props: { value: figma.string('Value'), label: figma.string('Label') },
  example: (props) => <ActivityRing {...props} />,
});
