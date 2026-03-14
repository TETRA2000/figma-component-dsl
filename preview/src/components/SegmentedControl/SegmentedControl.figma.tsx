import figma from '@figma/code-connect';
import { SegmentedControl } from './SegmentedControl';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(SegmentedControl, FIGMA_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <SegmentedControl
      items={['All', 'Active', 'Completed']}
      value="All"
      size={props.size}
    />
  ),
});
