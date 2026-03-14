import figma from '@figma/code-connect';
import { GameCard } from './GameCard';

figma.connect(GameCard, 'TODO_FIGMA_URL', {
  props: {
    title: figma.string('Title'),
    genre: figma.string('Genre'),
    players: figma.string('Players'),
  },
  example: ({ title, genre, players }) => (
    <GameCard title={title} genre={genre} players={players} />
  ),
});
