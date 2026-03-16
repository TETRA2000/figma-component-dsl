import figma from '@figma/code-connect';
import { UsernameTag } from './UsernameTag';

figma.connect(UsernameTag, 'https://figma.com/design/placeholder/UsernameTag', {
  props: { name: figma.string('Name'), level: figma.string('Level') },
  example: (props) => <UsernameTag {...props} />,
});
