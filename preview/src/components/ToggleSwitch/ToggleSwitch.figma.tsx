import figma from '@figma/code-connect';
import { ToggleSwitch } from './ToggleSwitch';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(ToggleSwitch, FIGMA_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    label: figma.string('Label'),
    checked: figma.boolean('Checked'),
  },
  example: (props) => (
    <ToggleSwitch size={props.size} label={props.label} checked={props.checked} />
  ),
});
