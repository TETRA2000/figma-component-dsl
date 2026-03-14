import figma from '@figma/code-connect';
import { PriceBadge } from './PriceBadge';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER?node-id=travel-price-badge';

figma.connect(PriceBadge, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Highlight: 'highlight',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <PriceBadge variant={props.variant}>{props.label}</PriceBadge>
  ),
});
