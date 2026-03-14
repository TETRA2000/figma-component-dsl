import figma from '@anthropic/code-connect';
import { MetricRow } from './MetricRow';

figma.connect(MetricRow, 'MetricRow', {
  props: {
    label: figma.string('label'),
    value: figma.string('value'),
    subValue: figma.string('subValue'),
  },
  example: (props) => <MetricRow {...props} />,
});
