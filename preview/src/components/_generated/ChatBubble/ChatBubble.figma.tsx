import figma from '@figma/code-connect';
import { ChatBubble } from './ChatBubble';

figma.connect(ChatBubble, 'https://figma.com/design/placeholder/ChatBubble', {
  props: {
    text: figma.string('Text'),
    timestamp: figma.string('Timestamp'),
    variant: figma.enum('Variant', { Sent: 'sent', Received: 'received' }),
  },
  example: (props) => <ChatBubble {...props} />,
});
