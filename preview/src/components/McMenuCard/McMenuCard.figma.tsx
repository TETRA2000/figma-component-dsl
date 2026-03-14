import figma from '@figma/code-connect';
import { McMenuCard } from './McMenuCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(McMenuCard, FIGMA_URL, {
  props: {
    name: figma.string('Name'),
    description: figma.string('Description'),
    price: figma.string('Price'),
    calories: figma.string('Calories'),
    badge: figma.string('Badge'),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <McMenuCard
      name={props.name}
      description={props.description}
      price={props.price}
      calories={props.calories}
      badge={props.badge}
      size={props.size}
    />
  ),
});
