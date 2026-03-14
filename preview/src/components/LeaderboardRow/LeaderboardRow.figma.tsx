import figma from '@figma/code-connect';
import { LeaderboardRow } from './LeaderboardRow';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER/LeaderboardRow';

figma.connect(LeaderboardRow, FIGMA_URL, {
  props: {
    username: figma.string('Username'),
    score: figma.string('Score'),
    level: figma.string('Level'),
    highlighted: figma.boolean('Highlighted'),
  },
  example: (props) => (
    <LeaderboardRow
      rank={1}
      username={props.username}
      score={props.score}
      level={props.level}
      highlighted={props.highlighted}
    />
  ),
});
