import figma from '@figma/code-connect';
import { PricingTier } from './PricingTier';

figma.connect(PricingTier, 'TODO_FIGMA_URL', {
  props: {
    name: figma.string('Name'),
    price: figma.string('Price'),
  },
  example: ({ name, price }) => (
    <PricingTier name={name} price={price} features={['Feature 1', 'Feature 2']} />
  ),
});
