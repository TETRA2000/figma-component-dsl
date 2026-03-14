import figma from '@figma/code-connect';
import { McOrderBanner } from './McOrderBanner';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(McOrderBanner, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Promo: 'promo',
      Delivery: 'delivery',
      Reward: 'reward',
      Info: 'info',
    }),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <McOrderBanner
      variant={props.variant}
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
});
