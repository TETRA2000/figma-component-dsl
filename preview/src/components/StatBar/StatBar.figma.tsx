import figma from '@figma/code-connect';
import { StatBar } from './StatBar';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/StatBar';

figma.connect(StatBar, FIGMA_URL, {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => (
    <StatBar label={props.label} value={75} maxValue={100} />
  ),
});
