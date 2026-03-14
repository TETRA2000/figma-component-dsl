import figma from '@figma/code-connect';
import { LeaderboardRow } from './LeaderboardRow';

figma.connect(LeaderboardRow, 'TODO_FIGMA_URL', {
  props: {
    rank: figma.string('Rank'),
    username: figma.string('Username'),
    score: figma.string('Score'),
  },
  example: ({ rank, username, score }) => (
    <LeaderboardRow rank={Number(rank)} username={username} score={score} />
  ),
});
