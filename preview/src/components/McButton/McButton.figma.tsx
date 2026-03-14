import figma from '@figma/code-connect';
import { McButton } from './McButton';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(McButton, FIGMA_URL, {
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
  },
  example: (props) => (
    <McButton variant={props.variant} size={props.size}>
      {props.label}
    </McButton>
  ),
});
