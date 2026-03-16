import figma from '@figma/code-connect';
import { IngredientItem } from './IngredientItem';

figma.connect(IngredientItem, 'https://figma.com/design/placeholder/IngredientItem', {
  props: {
    name: figma.string('Name'),
    amount: figma.string('Amount'),
    checked: figma.boolean('Checked'),
  },
  example: (props) => <IngredientItem {...props} />,
});
