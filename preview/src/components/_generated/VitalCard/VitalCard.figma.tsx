import figma from '@figma/code-connect';
import { VitalCard } from './VitalCard';

figma.connect(VitalCard, 'https://figma.com/design/placeholder/VitalCard', {
  props: {
    label: figma.string('Label'),
    value: figma.string('Value'),
    unit: figma.string('Unit'),
  },
  example: (props) => <VitalCard {...props} />,
});
