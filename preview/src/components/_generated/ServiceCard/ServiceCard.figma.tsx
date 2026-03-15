import figma from '@figma/code-connect';
import { ServiceCard } from './ServiceCard';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(ServiceCard, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: (props) => (
    <ServiceCard
      icon={<span>💼</span>}
      title={props.title}
      description={props.description}
    />
  ),
});
