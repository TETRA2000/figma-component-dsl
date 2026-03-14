import figma from '@figma/code-connect';
import { LogoCloud } from './LogoCloud';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1395';

figma.connect(LogoCloud, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    variant: figma.enum('Variant', {
      Grid: 'grid',
      Scroll: 'scroll',
    }),
  },
  example: (props) => (
    <LogoCloud
      title={props.title}
      logos={[]}
      variant={props.variant}
    />
  ),
});
