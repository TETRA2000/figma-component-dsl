import figma from '@figma/code-connect';
import { McBadge } from './McBadge';

const FIGMA_URL = 'https://www.figma.com/design/PLACEHOLDER';

figma.connect(McBadge, FIGMA_URL, {
  props: {
    variant: figma.enum('Variant', {
      Promo: 'promo',
      New: 'new',
      Limited: 'limited',
      Value: 'value',
    }),
    label: figma.string('Label'),
  },
  example: (props) => (
    <McBadge variant={props.variant}>
      {props.label}
    </McBadge>
  ),
});
