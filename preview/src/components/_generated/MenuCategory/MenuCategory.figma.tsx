import figma from '@figma/code-connect';
import { MenuCategory } from './MenuCategory';

figma.connect(MenuCategory, 'https://figma.com/design/placeholder/MenuCategory', {
  props: {
    name: figma.string('Name'),
    children: figma.children('Items'),
  },
  example: (props) => <MenuCategory {...props} />,
});
