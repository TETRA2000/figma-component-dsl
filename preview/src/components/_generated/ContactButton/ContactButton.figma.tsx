import figma from '@figma/code-connect';
import { ContactButton } from './ContactButton';

figma.connect(ContactButton, 'https://figma.com/design/placeholder/ContactButton', {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => <ContactButton {...props} />,
});
