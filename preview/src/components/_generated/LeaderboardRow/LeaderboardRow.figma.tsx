import figma from '@figma/code-connect';
import { LeaderboardRow } from './LeaderboardRow';

figma.connect(LeaderboardRow, 'https://figma.com/design/placeholder/LeaderboardRow', {
  props: { name: figma.string('Name'), score: figma.string('Score') },
  example: (props) => <LeaderboardRow {...props} />,
});
