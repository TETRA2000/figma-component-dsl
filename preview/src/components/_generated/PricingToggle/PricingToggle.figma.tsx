import figma from '@figma/code-connect';
import { PricingToggle } from './PricingToggle';

figma.connect(PricingToggle, 'https://figma.com/design/placeholder/PricingToggle', {
  props: {
    isAnnual: figma.boolean('Is Annual'),
  },
  example: (props) => <PricingToggle {...props} />,
});
