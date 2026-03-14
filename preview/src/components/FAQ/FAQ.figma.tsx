import figma from '@figma/code-connect';
import { FAQ } from './FAQ';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1541';

figma.connect(FAQ, FIGMA_URL, {
  props: {
    badge: figma.string('Badge'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <FAQ
      badge={props.badge}
      title={props.title}
      subtitle={props.subtitle}
      items={[
        { question: 'Question 1?', answer: 'Answer 1.' },
        { question: 'Question 2?', answer: 'Answer 2.' },
      ]}
    />
  ),
});
