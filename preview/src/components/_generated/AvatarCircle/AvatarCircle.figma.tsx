import figma from '@figma/code-connect';
import { AvatarCircle } from './AvatarCircle';

figma.connect(AvatarCircle, 'https://figma.com/design/placeholder/AvatarCircle', {
  props: {
    initials: figma.string('Initials'),
    size: figma.enum('Size', { Small: 32, Medium: 40, Large: 56 }),
    online: figma.boolean('Online'),
  },
  example: (props) => <AvatarCircle {...props} />,
});
