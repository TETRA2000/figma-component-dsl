import figma from '@anthropic/code-connect';
import { PricingTier } from './PricingTier';

figma.connect(PricingTier, 'PricingTier', {
  props: {
    name: figma.string('name'),
    price: figma.string('price'),
    highlighted: figma.boolean('highlighted'),
  },
  example: (props) => <PricingTier features={['Feature 1', 'Feature 2']} {...props} />,
});
