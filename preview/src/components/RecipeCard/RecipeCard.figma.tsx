import figma from '@anthropic/code-connect';
import { RecipeCard } from './RecipeCard';

figma.connect(RecipeCard, 'RecipeCard', {
  props: {
    title: figma.string('title'),
    description: figma.string('description'),
    time: figma.string('time'),
    difficulty: figma.string('difficulty'),
  },
  example: (props) => <RecipeCard {...props} />,
});
