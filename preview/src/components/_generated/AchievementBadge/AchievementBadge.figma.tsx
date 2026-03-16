import figma from '@figma/code-connect';
import { AchievementBadge } from './AchievementBadge';

figma.connect(AchievementBadge, 'https://figma.com/design/placeholder/AchievementBadge', {
  props: {
    name: figma.string('Name'),
    earned: figma.boolean('Earned'),
    statusLabel: figma.string('Status Label'),
  },
  example: (props) => <AchievementBadge {...props} />,
});
