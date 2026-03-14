import figma from '@figma/code-connect';
import { Stats } from './Stats';

const FIGMA_URL = 'https://www.figma.com/design/18snbORL1E5bCSov2YontW/Untitled?node-id=5-1376';

figma.connect(Stats, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Inline: 'inline',
      Cards: 'cards',
    }),
  },
  example: (props) => (
    <Stats
      stats={[
        { value: '10M+', label: 'Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '150+', label: 'Countries' },
      ]}
      variant={props.variant}
    />
  ),
});
