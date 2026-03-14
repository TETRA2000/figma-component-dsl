import figma from '@anthropic/code-connect';
import { IngredientRow } from './IngredientRow';

figma.connect(IngredientRow, 'IngredientRow', {
  props: {
    name: figma.string('name'),
    amount: figma.string('amount'),
  },
  example: (props) => <IngredientRow {...props} />,
});
