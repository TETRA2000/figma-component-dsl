import figma from '@figma/code-connect';
import { AuthorByline } from './AuthorByline';

figma.connect(AuthorByline, 'https://figma.com/design/placeholder/AuthorByline', {
  props: { name: figma.string('Name'), role: figma.string('Role') },
  example: (props) => <AuthorByline {...props} />,
});
