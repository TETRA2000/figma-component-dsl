import figma from '@figma/code-connect';
import { Blockquote } from './Blockquote';

figma.connect(Blockquote, 'https://figma.com/design/placeholder/Blockquote', {
  props: { quote: figma.string('Quote'), author: figma.string('Author') },
  example: (props) => <Blockquote {...props} />,
});
