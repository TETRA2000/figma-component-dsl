import figma from '@figma/code-connect';
import { Badge } from './Badge';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1238';

figma.connect(Badge, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Primary: 'primary',
      Success: 'success',
      Warning: 'warning',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <Badge variant={props.variant}>{props.label}</Badge>
  ),
});
