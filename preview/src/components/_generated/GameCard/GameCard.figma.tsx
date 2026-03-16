import figma from '@figma/code-connect';
import { GameCard } from './GameCard';

figma.connect(GameCard, 'https://figma.com/design/placeholder/GameCard', {
  props: { title: figma.string('Title'), genre: figma.string('Genre') },
  example: (props) => <GameCard {...props} />,
});
