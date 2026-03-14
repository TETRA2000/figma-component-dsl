import figma from '@figma/code-connect';
import { MiniChart } from './MiniChart';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/MiniChart';

figma.connect(MiniChart, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
  },
  example: (props) => (
    <MiniChart title={props.title} bars={[40, 65, 55, 80, 70, 90, 60]} />
  ),
});
