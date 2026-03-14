import figma from '@figma/code-connect';
import { PropertyCard } from './PropertyCard';

figma.connect(PropertyCard, 'PLACEHOLDER_FIGMA_URL', {
  props: {
    title: figma.string('Title'),
    location: figma.string('Location'),
    price: figma.string('Price'),
    rating: figma.string('Rating'),
    reviews: figma.string('Reviews'),
  },
  example: (props) => <PropertyCard {...props} reviews={Number(props.reviews)} />,
});
