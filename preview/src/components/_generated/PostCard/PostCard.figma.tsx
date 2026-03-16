import figma from '@figma/code-connect';
import { PostCard } from './PostCard';

figma.connect(PostCard, 'https://figma.com/design/placeholder/PostCard', {
  props: {
    initials: figma.string('Initials'),
    username: figma.string('Username'),
    handle: figma.string('Handle'),
    timestamp: figma.string('Timestamp'),
    body: figma.string('Body'),
    online: figma.boolean('Online'),
  },
  example: (props) => <PostCard {...props} />,
});
