import figma from '@figma/code-connect';
import { StepCounter } from './StepCounter';
figma.connect(StepCounter, 'https://figma.com/design/placeholder/StepCounter', {
  props: { steps: figma.string('Steps'), goal: figma.string('Goal') },
  example: (props) => <StepCounter {...props} />,
});
