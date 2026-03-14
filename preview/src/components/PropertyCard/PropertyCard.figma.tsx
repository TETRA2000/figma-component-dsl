import figma from '@figma/code-connect';
import { PropertyCard } from './PropertyCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER?node-id=travel-property-card';

figma.connect(PropertyCard, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    location: figma.string('Location'),
    price: figma.string('Price'),
    rating: figma.enum('Rating', {
      '5.0': 5.0,
      '4.8': 4.8,
      '4.5': 4.5,
    }),
  },
  example: (props) => (
    <PropertyCard
      title={props.title}
      location={props.location}
      price={props.price}
      rating={props.rating}
    />
  ),
});
