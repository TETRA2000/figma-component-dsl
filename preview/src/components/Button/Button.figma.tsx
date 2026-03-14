import figma from '@figma/code-connect';
import { Button } from './Button';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1229';

figma.connect(Button, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Outline: 'outline',
      Ghost: 'ghost',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    label: figma.string('Label'),
    fullWidth: figma.boolean('Full Width'),
  },
  example: (props) => (
    <Button variant={props.variant} size={props.size} fullWidth={props.fullWidth}>
      {props.label}
    </Button>
  ),
});
