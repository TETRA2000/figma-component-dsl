import figma from '@figma/code-connect';
import { PricingTier } from './PricingTier';

figma.connect(PricingTier, 'https://figma.com/design/placeholder/PricingTier', {
  props: {
    tierName: figma.string('Tier Name'),
    price: figma.string('Price'),
    period: figma.string('Period'),
    description: figma.string('Description'),
    highlighted: figma.boolean('Highlighted'),
    ctaLabel: figma.string('CTA Label'),
  },
  example: (props) => <PricingTier {...props} />,
});
