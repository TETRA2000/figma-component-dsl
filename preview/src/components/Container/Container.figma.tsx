import figma from '@figma/code-connect';
import { Container } from './Container';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1247';

figma.connect(Container, FIGMA_URL, {
  props: {
    maxWidth: figma.enum('Max Width', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
      'Extra Large': 'xl',
    }),
  },
  example: (props) => (
    <Container maxWidth={props.maxWidth}>
      {'{children}'}
    </Container>
  ),
});
