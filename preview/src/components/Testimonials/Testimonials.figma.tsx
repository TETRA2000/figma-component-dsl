import figma from '@figma/code-connect';
import { Testimonials } from './Testimonials';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1436';

figma.connect(Testimonials, FIGMA_URL, {
  props: {
    badge: figma.string('Badge'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <Testimonials
      badge={props.badge}
      title={props.title}
      subtitle={props.subtitle}
      testimonials={[]}
    />
  ),
});
