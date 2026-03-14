import figma from '@figma/code-connect';
import { MetricCard } from './MetricCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/MetricCard';

figma.connect(MetricCard, FIGMA_URL, {
  props: {
    label: figma.string('Label'),
    value: figma.string('Value'),
    change: figma.string('Change'),
    positive: figma.boolean('Positive'),
  },
  example: (props) => (
    <MetricCard
      label={props.label}
      value={props.value}
      change={props.change}
      positive={props.positive}
    />
  ),
});
