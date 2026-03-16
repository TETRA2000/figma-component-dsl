import figma from '@figma/code-connect';
import { ChatHeader } from './ChatHeader';

figma.connect(ChatHeader, 'https://figma.com/design/placeholder/ChatHeader', {
  props: {
    name: figma.string('Name'),
    online: figma.boolean('Online'),
  },
  example: (props) => <ChatHeader {...props} />,
});
