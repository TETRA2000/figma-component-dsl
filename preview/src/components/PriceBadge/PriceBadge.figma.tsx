import figma from '@figma/code-connect';
import { PriceBadge } from './PriceBadge';

figma.connect(PriceBadge, 'PLACEHOLDER_FIGMA_URL', {
  props: {
    price: figma.string('Price'),
    highlight: figma.boolean('Highlight'),
  },
  example: (props) => <PriceBadge {...props} />,
});
