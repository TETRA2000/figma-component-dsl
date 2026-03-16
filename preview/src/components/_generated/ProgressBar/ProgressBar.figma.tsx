import figma from '@figma/code-connect';
import { ProgressBar } from './ProgressBar';

figma.connect(ProgressBar, 'https://figma.com/design/placeholder/ProgressBar', {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => <ProgressBar {...props} />,
});
