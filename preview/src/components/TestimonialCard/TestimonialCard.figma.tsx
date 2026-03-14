import figma from '@figma/code-connect';
import { TestimonialCard } from './TestimonialCard';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1435';

figma.connect(TestimonialCard, FIGMA_URL, {
  props: {
    quote: figma.string('Quote'),
    author: figma.string('Author'),
    title: figma.string('Title'),
    rating: figma.enum('Rating', {
      '3': 3,
      '4': 4,
      '5': 5,
    }),
  },
  example: (props) => (
    <TestimonialCard
      quote={props.quote}
      author={props.author}
      title={props.title}
      rating={props.rating}
    />
  ),
});
