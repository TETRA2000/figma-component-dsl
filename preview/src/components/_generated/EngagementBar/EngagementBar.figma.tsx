import figma from '@figma/code-connect';
import { EngagementBar } from './EngagementBar';

figma.connect(EngagementBar, 'https://figma.com/design/placeholder/EngagementBar', {
  props: {
    likes: figma.string('Likes'),
    comments: figma.string('Comments'),
    shares: figma.string('Shares'),
    bookmarks: figma.string('Bookmarks'),
  },
  example: (props) => <EngagementBar {...props} />,
});
