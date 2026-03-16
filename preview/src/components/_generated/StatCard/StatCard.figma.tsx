import figma from '@figma/code-connect';
import { StatCard } from './StatCard';

figma.connect(StatCard, 'https://figma.com/design/placeholder/StatCard', {
  props: {
    label: figma.string('Label'),
    value: figma.string('Value'),
    change: figma.string('Change'),
  },
  example: (props) => <StatCard {...props} />,
});
