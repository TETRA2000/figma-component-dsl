import figma from '@anthropic/code-connect';
import { ProgressBar } from './ProgressBar';

figma.connect(ProgressBar, 'ProgressBar', {
  props: {
    label: figma.string('label'),
    value: figma.number('value'),
  },
  example: (props) => <ProgressBar {...props} />,
});
