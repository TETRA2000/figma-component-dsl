import figma from '@figma/code-connect';
import { PropertyCard } from './PropertyCard';

figma.connect(PropertyCard, 'https://figma.com/design/placeholder/PropertyCard', {
  props: {
    price: figma.string('Price'),
    address: figma.string('Address'),
    neighborhood: figma.string('Neighborhood'),
    beds: figma.number('Beds'),
    baths: figma.number('Baths'),
    sqft: figma.string('Sqft'),
  },
  example: (props) => <PropertyCard {...props} />,
});
