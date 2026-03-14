import figma from '@figma/code-connect';
import { PricingTable } from './PricingTable';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1517';

figma.connect(PricingTable, FIGMA_URL, {
  props: {
    badge: figma.string('Badge'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <PricingTable
      badge={props.badge}
      title={props.title}
      subtitle={props.subtitle}
      plans={[]}
    />
  ),
});
