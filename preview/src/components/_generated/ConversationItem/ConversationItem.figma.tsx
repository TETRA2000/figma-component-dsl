import figma from '@figma/code-connect';
import { ConversationItem } from './ConversationItem';

figma.connect(ConversationItem, 'https://figma.com/design/placeholder/ConversationItem', {
  props: {
    name: figma.string('Name'),
    lastMessage: figma.string('Last Message'),
    time: figma.string('Time'),
    unreadCount: figma.enum('Unread Count', { None: 0, One: 1, Few: 3, Many: 9 }),
    selected: figma.boolean('Selected'),
  },
  example: (props) => <ConversationItem {...props} />,
});
