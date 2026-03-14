import figma from '@figma/code-connect';
import { FeatureGrid } from './FeatureGrid';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1346';

figma.connect(FeatureGrid, FIGMA_URL, {
  props: {
    badge: figma.string('Badge'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
    columns: figma.enum('Columns', {
      '2': 2,
      '3': 3,
      '4': 4,
    }),
  },
  example: (props) => (
    <FeatureGrid
      badge={props.badge}
      title={props.title}
      subtitle={props.subtitle}
      features={[]}
      columns={props.columns}
    />
  ),
});
