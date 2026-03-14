import figma from '@anthropic/code-connect';
import { StatCard } from './StatCard';

figma.connect(StatCard, 'StatCard', {
  props: {
    label: figma.string('label'),
    value: figma.string('value'),
    change: figma.string('change'),
    trend: figma.enum('trend', { up: 'up', down: 'down' }),
  },
  example: (props) => <StatCard {...props} />,
});
