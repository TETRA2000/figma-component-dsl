import figma from '@figma/code-connect';
import { TeamMember } from './TeamMember';

figma.connect(TeamMember, 'https://figma.com/design/placeholder/TeamMember', {
  props: {
    name: figma.string('Name'),
    initials: figma.string('Initials'),
    color: figma.string('Color'),
  },
  example: (props) => <TeamMember {...props} />,
});
