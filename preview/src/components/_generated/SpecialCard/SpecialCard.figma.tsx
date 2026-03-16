import figma from '@figma/code-connect';
import { SpecialCard } from './SpecialCard';

figma.connect(SpecialCard, 'https://figma.com/design/placeholder/SpecialCard', {
  props: {
    dishName: figma.string('DishName'),
    description: figma.string('Description'),
    price: figma.string('Price'),
  },
  example: (props) => <SpecialCard {...props} />,
});
