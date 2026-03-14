import figma from '@figma/code-connect';
import { PricingCard } from './PricingCard';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1516';

figma.connect(PricingCard, FIGMA_URL, {
  props: {
    name: figma.string('Name'),
    price: figma.string('Price'),
    description: figma.string('Description'),
    cta: figma.string('CTA'),
    highlighted: figma.boolean('Highlighted'),
  },
  example: (props) => (
    <PricingCard
      name={props.name}
      price={props.price}
      description={props.description}
      features={['Feature 1', 'Feature 2', 'Feature 3']}
      cta={props.cta}
      highlighted={props.highlighted}
    />
  ),
});
