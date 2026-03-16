import figma from '@figma/code-connect';
import { RecipeCard } from './RecipeCard';

figma.connect(RecipeCard, 'https://figma.com/design/placeholder/RecipeCard', {
  props: {
    title: figma.string('Title'),
    cookingTime: figma.string('CookingTime'),
    rating: figma.string('Rating'),
  },
  example: (props) => <RecipeCard {...props} />,
});
