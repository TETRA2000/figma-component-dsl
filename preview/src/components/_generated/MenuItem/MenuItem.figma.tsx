import figma from '@figma/code-connect';
import { MenuItem } from './MenuItem';

figma.connect(MenuItem, 'https://figma.com/design/placeholder/MenuItem', {
  props: {
    name: figma.string('Name'),
    description: figma.string('Description'),
    price: figma.string('Price'),
    popular: figma.boolean('Popular'),
  },
  example: (props) => <MenuItem {...props} />,
});
