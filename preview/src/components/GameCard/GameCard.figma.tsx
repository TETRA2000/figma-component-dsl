import figma from '@figma/code-connect';
import { GameCard } from './GameCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/GameCard';

figma.connect(GameCard, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    genre: figma.string('Genre'),
    price: figma.string('Price'),
    rating: figma.string('Rating'),
  },
  example: (props) => (
    <GameCard
      title={props.title}
      genre={props.genre}
      price={props.price}
      rating={props.rating}
    />
  ),
});
