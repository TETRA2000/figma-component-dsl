import figma from '@figma/code-connect';
import { FeatureCard } from './FeatureCard';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1282';

figma.connect(FeatureCard, FIGMA_URL, {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <FeatureCard
      icon={props.icon}
      title={props.title}
      description={props.description}
    />
  ),
});
