import figma from '@figma/code-connect';
import { AgentCard } from './AgentCard';

figma.connect(AgentCard, 'https://figma.com/design/placeholder/AgentCard', {
  props: {
    name: figma.string('Name'),
    initials: figma.string('Initials'),
    phone: figma.string('Phone'),
    rating: figma.number('Rating'),
    reviewCount: figma.number('Review Count'),
  },
  example: (props) => <AgentCard {...props} />,
});
