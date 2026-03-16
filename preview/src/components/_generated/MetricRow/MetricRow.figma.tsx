import figma from '@figma/code-connect';
import { MetricRow } from './MetricRow';

figma.connect(MetricRow, 'https://figma.com/design/placeholder/MetricRow', {
  props: {
    label: figma.string('Label'),
    value: figma.string('Value'),
    trend: figma.string('Trend'),
  },
  example: (props) => <MetricRow {...props} />,
});
